import { supabaseAdmin } from '../../_lib/supabaseAdmin.js'
import { getFlowConfig, flowPost } from '../../_lib/flow.js'
import { jsonResponse, getRequestOrigin } from '../../_lib/http.js'

const buildCommerceOrder = (paymentId) => `LMS-${paymentId}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return jsonResponse(res, 405, { error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization || ''
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!accessToken) {
    return jsonResponse(res, 401, { error: 'Missing access token' })
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(accessToken)

  if (authError || !authData.user) {
    return jsonResponse(res, 401, { error: 'Invalid user session' })
  }

  const { courseId, paymentMethod = 9 } = req.body || {}

  if (!courseId) {
    return jsonResponse(res, 400, { error: 'courseId is required' })
  }

  const [{ data: course, error: courseError }, { data: profile, error: profileError }] = await Promise.all([
    supabaseAdmin
      .from('courses')
      .select('id, title, price, status, course_type, access_duration_days')
      .eq('id', courseId)
      .maybeSingle(),
    supabaseAdmin
      .from('users')
      .select('id, email, full_name, phone_international')
      .eq('id', authData.user.id)
      .maybeSingle(),
  ])

  if (courseError) {
    return jsonResponse(res, 500, { error: courseError.message })
  }

  if (profileError) {
    return jsonResponse(res, 500, { error: profileError.message })
  }

  if (!course || course.status !== 'published' || course.course_type !== 'paid') {
    return jsonResponse(res, 400, { error: 'The selected course is not available for payment' })
  }

  const { data: existingEnrollment } = await supabaseAdmin
    .from('course_enrollments')
    .select('id, access_status')
    .eq('user_id', authData.user.id)
    .eq('course_id', course.id)
    .maybeSingle()

  if (existingEnrollment?.access_status === 'active') {
    return jsonResponse(res, 409, { error: 'The course is already active for this user' })
  }

  const { data: pendingPayment, error: pendingPaymentError } = await supabaseAdmin
    .from('payments')
    .insert({
      user_id: authData.user.id,
      course_id: course.id,
      provider: 'flow',
      amount: Number(course.price || 0),
      currency: 'PEN',
      status: 'pending',
      payload: {
        createdFrom: 'lms_user_checkout',
        requestedPaymentMethod: Number(paymentMethod || 9),
      },
    })
    .select('id')
    .single()

  if (pendingPaymentError) {
    return jsonResponse(res, 500, { error: pendingPaymentError.message })
  }

  const commerceOrder = buildCommerceOrder(pendingPayment.id)
  const origin = getRequestOrigin(req)
  const { apiKey } = getFlowConfig()

  try {
    const flowResponse = await flowPost('/payment/create', {
      apiKey,
      commerceOrder,
      subject: course.title,
      currency: 'PEN',
      amount: Number(course.price || 0),
      email: profile?.email || authData.user.email,
      paymentMethod: Number(paymentMethod || 9),
      urlConfirmation: `${origin}/api/payments/flow/confirm`,
      urlReturn: `${origin}/api/payments/flow/return`,
      optional: JSON.stringify({
        paymentId: pendingPayment.id,
        courseId: course.id,
        userId: authData.user.id,
      }),
      payment_currency: 'PEN',
    })

    const checkoutUrl = `${flowResponse.url}?token=${flowResponse.token}`

    const { error: updatePaymentError } = await supabaseAdmin
      .from('payments')
      .update({
        provider_payment_id: String(flowResponse.flowOrder || commerceOrder),
        payload: {
          createdFrom: 'lms_user_checkout',
          requestedPaymentMethod: Number(paymentMethod || 9),
          flowOrder: flowResponse.flowOrder,
          flowToken: flowResponse.token,
          checkoutUrl,
          commerceOrder,
        },
      })
      .eq('id', pendingPayment.id)

    if (updatePaymentError) {
      return jsonResponse(res, 500, { error: updatePaymentError.message })
    }

    return jsonResponse(res, 200, {
      success: true,
      paymentId: pendingPayment.id,
      checkoutUrl,
      flowOrder: flowResponse.flowOrder,
      token: flowResponse.token,
    })
  } catch (error) {
    await supabaseAdmin
      .from('payments')
      .update({
        status: 'failed',
        payload: {
          createdFrom: 'lms_user_checkout',
          requestedPaymentMethod: Number(paymentMethod || 9),
          flowError: error.details || error.message,
          commerceOrder,
        },
      })
      .eq('id', pendingPayment.id)

    return jsonResponse(res, error.status || 500, {
      error: error.message || 'Flow payment creation failed',
      details: error.details,
    })
  }
}
