import { supabaseAdmin } from '../../_lib/supabaseAdmin.js'
import { getFlowPaymentStatus } from '../../_lib/flow.js'
import { parseFormUrlEncodedBody } from '../../_lib/http.js'

const mapFlowStatusToPaymentStatus = (flowStatus) => {
  if (flowStatus === 2) return 'paid'
  if (flowStatus === 1) return 'pending'
  return 'failed'
}

const getPaymentIdFromOptional = (optionalValue) => {
  if (!optionalValue) return null

  try {
    const parsed = typeof optionalValue === 'string' ? JSON.parse(optionalValue) : optionalValue
    return parsed.paymentId || null
  } catch {
    return null
  }
}

const activateEnrollmentIfPaid = async ({ payment, paymentStatus }) => {
  if (paymentStatus !== 'paid' || !payment?.course_id || !payment?.user_id) {
    return
  }

  const { data: course } = await supabaseAdmin
    .from('courses')
    .select('id, access_duration_days')
    .eq('id', payment.course_id)
    .maybeSingle()

  if (!course) return

  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setDate(expiresAt.getDate() + Number(course.access_duration_days || 30))

  await supabaseAdmin
    .from('course_enrollments')
    .upsert(
      {
        user_id: payment.user_id,
        course_id: payment.course_id,
        access_status: 'active',
        access_starts_at: now.toISOString(),
        access_expires_at: expiresAt.toISOString(),
      },
      {
        onConflict: 'user_id,course_id',
      }
    )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    return res.end('Method not allowed')
  }

  const { token } = parseFormUrlEncodedBody(req.body)

  if (!token) {
    res.statusCode = 400
    return res.end('Missing token')
  }

  try {
    const flowStatus = await getFlowPaymentStatus(token)
    const paymentStatus = mapFlowStatusToPaymentStatus(Number(flowStatus.status))
    const paymentId = getPaymentIdFromOptional(flowStatus.optional)

    if (paymentId) {
      const { data: payment } = await supabaseAdmin
        .from('payments')
        .update({
          provider_payment_id: String(flowStatus.flowOrder || paymentId),
          status: paymentStatus,
          paid_at: paymentStatus === 'paid' ? new Date().toISOString() : null,
          payload: {
            flowOrder: flowStatus.flowOrder,
            commerceOrder: flowStatus.commerceOrder,
            payer: flowStatus.payer,
            status: Number(flowStatus.status),
            subject: flowStatus.subject,
            token,
            optional: flowStatus.optional,
            paymentData: flowStatus.paymentData || null,
            pendingInfo: flowStatus.pending_info || null,
          },
        })
        .eq('id', paymentId)
        .select('id, course_id, user_id')
        .single()

      await activateEnrollmentIfPaid({ payment, paymentStatus })
    }

    res.statusCode = 200
    return res.end('OK')
  } catch {
    res.statusCode = 200
    return res.end('OK')
  }
}
