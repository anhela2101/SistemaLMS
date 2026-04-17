import { supabaseAdmin } from '../_lib/supabaseAdmin.js'
import { jsonResponse } from '../_lib/http.js'

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

  const { courseId } = req.body || {}

  if (!courseId) {
    return jsonResponse(res, 400, { error: 'courseId is required' })
  }

  const { data: course, error: courseError } = await supabaseAdmin
    .from('courses')
    .select('id, course_type, status, access_duration_days')
    .eq('id', courseId)
    .maybeSingle()

  if (courseError) {
    return jsonResponse(res, 500, { error: courseError.message })
  }

  if (!course || course.status !== 'published' || course.course_type !== 'free') {
    return jsonResponse(res, 400, { error: 'The selected course is not available as free' })
  }

  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setDate(expiresAt.getDate() + Number(course.access_duration_days || 30))

  const { data: enrollment, error: enrollmentError } = await supabaseAdmin
    .from('course_enrollments')
    .upsert(
      {
        user_id: authData.user.id,
        course_id: course.id,
        access_status: 'active',
        access_starts_at: now.toISOString(),
        access_expires_at: expiresAt.toISOString(),
      },
      {
        onConflict: 'user_id,course_id',
      }
    )
    .select('id, course_id, access_status, access_expires_at')
    .single()

  if (enrollmentError) {
    return jsonResponse(res, 500, { error: enrollmentError.message })
  }

  return jsonResponse(res, 200, {
    success: true,
    enrollment,
  })
}
