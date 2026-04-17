import { supabase } from './supabaseClient'

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
})

const DATE_FORMATTER = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const LESSONS_SELECT = 'id, course_id, module_id, title, description, bunny_video_id, bunny_video_url, material_url, sort_order, is_active'

const MODULES_SELECT = 'id, course_id, title, description, sort_order, is_active'

const COURSES_SELECT = 'id, title, description, thumbnail_url, course_type, price, access_duration_days, status, level, category, created_at'

const ENROLLMENTS_SELECT = 'id, course_id, access_status, access_starts_at, access_expires_at, progress_percent, created_at'

const PAYMENTS_SELECT = 'id, course_id, provider, provider_payment_id, amount, currency, status, payload, paid_at, created_at'

const CERTIFICATES_SELECT = 'id, course_id, code, pdf_url, status, issued_at, created_at'

export const FLOW_PAYMENT_METHODS = [
  { id: 9, label: 'Todos', description: 'Checkout con todos los medios activos.' },
  { id: 11, label: 'Tarjetas', description: 'Credito y debito.' },
  { id: 152, label: 'Yape', description: 'Billetera digital.' },
  { id: 29, label: 'Efectivo', description: 'Banca movil, agentes y bodegas.' },
]

const getCourseImage = (course) => {
  return (
    course.thumbnail_url ||
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'
  )
}

const getPaidStateLabel = (payment) => {
  if (!payment) return null

  if (payment.status === 'paid') return 'Pagado'
  if (payment.status === 'pending') return 'Pendiente'
  if (payment.status === 'failed') return 'Fallido'

  return payment.status
}

const getEnrollmentState = ({ enrollment, certificate }) => {
  if (!enrollment) {
    return 'not_enrolled'
  }

  if (certificate?.status === 'issued') {
    return 'certified'
  }

  if (enrollment.progress_percent >= 100) {
    return 'completed'
  }

  if (enrollment.progress_percent > 0) {
    return 'in_progress'
  }

  if (enrollment.access_status === 'expired') {
    return 'expired'
  }

  if (enrollment.access_status === 'blocked') {
    return 'blocked'
  }

  return 'ready'
}

const getExploreAction = ({ course, enrollment, certificate, latestPayment }) => {
  const state = getEnrollmentState({ enrollment, certificate })

  if (course.course_type === 'free') {
    if (state === 'certified') {
      return { label: 'Ver certificado', action: 'certificates' }
    }

    if (state === 'completed') {
      return { label: 'Volver a ver', action: 'start' }
    }

    if (state === 'in_progress') {
      return { label: 'Continuar', action: 'start' }
    }

    if (state === 'blocked') {
      return { label: 'Acceso bloqueado', action: 'detail', disabled: true }
    }

    return { label: 'Empezar', action: 'enroll' }
  }

  if (state === 'certified') {
    return { label: 'Ver certificado', action: 'certificates' }
  }

  if (state === 'completed') {
    return { label: 'Volver a ver', action: 'start' }
  }

  if (state === 'in_progress' || state === 'ready') {
    return { label: 'Continuar', action: 'start' }
  }

  if (state === 'blocked') {
    return { label: 'Acceso bloqueado', action: 'detail', disabled: true }
  }

  if (state === 'expired') {
    return { label: 'Renovar acceso', action: 'detail' }
  }

  if (latestPayment?.status === 'pending') {
    return { label: 'Pago pendiente', action: 'purchases' }
  }

  if (latestPayment?.status === 'failed') {
    return { label: 'Reintentar pago', action: 'detail' }
  }

  return { label: 'Comprar', action: 'detail' }
}

const buildExploreCourse = ({ course, lessonCount, enrollment, certificate, latestPayment }) => {
  const action = getExploreAction({ course, enrollment, certificate, latestPayment })
  const isAccessible = Boolean(enrollment) || course.course_type === 'free'

  return {
    id: course.id,
    title: course.title,
    description: course.description || 'Capacitacion disponible para tu plan de aprendizaje.',
    image: getCourseImage(course),
    level: course.level || 'General',
    category: course.category || 'General',
    durationLabel: `${course.access_duration_days} dias acceso`,
    lessonsLabel: `${lessonCount} ${lessonCount === 1 ? 'leccion' : 'lecciones'}`,
    price: Number(course.price || 0),
    priceLabel: course.course_type === 'paid' ? CURRENCY_FORMATTER.format(Number(course.price || 0)) : null,
    typeLabel: course.course_type === 'free' ? 'Gratuito' : 'Pago',
    isAccessible,
    enrollment,
    certificate,
    latestPayment,
    action,
  }
}

const buildMyCourse = ({ course, lessonCount, moduleCount, enrollment, certificate }) => {
  const state = getEnrollmentState({ enrollment, certificate })
  const accessDaysLeft = getDaysLeft(enrollment?.access_expires_at)
  const modulesCompleted = Math.round((Number(enrollment?.progress_percent || 0) / 100) * Math.max(moduleCount, 1))

  let tag = null
  let tagColor = null
  let cta = 'Continuar'
  let actionPath = `/course-start/${course.id}`

  if (course.course_type === 'free') {
    tag = 'Gratis'
    tagColor = 'rgba(45, 170, 173, 1)'
  }

  if (state === 'certified') {
    tag = 'Curso finalizado'
    tagColor = 'rgba(19, 35, 145, 1)'
    cta = 'Ver certificado'
    actionPath = '/my-certificates'
  } else if (state === 'completed') {
    cta = 'Volver a ver'
  } else if (state === 'ready') {
    cta = 'Empezar'
  } else if (state === 'expired') {
    cta = 'Renovar acceso'
    actionPath = `/courses/${course.id}`
  } else if (state === 'blocked') {
    cta = 'Acceso bloqueado'
    actionPath = `/courses/${course.id}`
  }

  return {
    id: course.id,
    title: course.title,
    description: course.description || 'Capacitacion disponible en tu cuenta.',
    duration: `${course.access_duration_days} dias acceso`,
    lessons: `${lessonCount} ${lessonCount === 1 ? 'leccion' : 'lecciones'}`,
    level: course.level || 'General',
    image: getCourseImage(course),
    modulesText: `${Math.min(modulesCompleted, moduleCount)}/${moduleCount} modulos`,
    progress: Number(enrollment?.progress_percent || 0),
    tag,
    tagColor,
    daysLabel: accessDaysLeft !== null ? `${accessDaysLeft} dias` : null,
    cta,
    actionPath,
  }
}

const getDaysLeft = (dateString) => {
  if (!dateString) return null

  const expiresAt = new Date(dateString)
  const now = new Date()
  const diff = expiresAt.getTime() - now.getTime()

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const ensureAuthenticatedUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error
  if (!data.user) throw new Error('No hay una sesion activa.')

  return data.user
}

const listToMap = (items, keyName) => {
  return new Map(items.map((item) => [item[keyName], item]))
}

const listToGroupedCountMap = (items, keyName) => {
  return items.reduce((map, item) => {
    const key = item[keyName]
    map.set(key, (map.get(key) || 0) + 1)
    return map
  }, new Map())
}

const fetchPublishedCourseBundle = async (userId) => {
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select(COURSES_SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (coursesError) throw coursesError

  const courseIds = courses.map((course) => course.id)

  if (!courseIds.length) {
    return {
      courses: [],
      lessonCountByCourseId: new Map(),
      moduleCountByCourseId: new Map(),
      enrollmentByCourseId: new Map(),
      certificateByCourseId: new Map(),
      paymentByCourseId: new Map(),
    }
  }

  const [
    { data: lessons, error: lessonsError },
    { data: modules, error: modulesError },
    { data: enrollments, error: enrollmentsError },
    { data: certificates, error: certificatesError },
    { data: payments, error: paymentsError },
  ] = await Promise.all([
    supabase.from('lessons').select('course_id').in('course_id', courseIds).eq('is_active', true),
    supabase.from('course_modules').select('course_id').in('course_id', courseIds).eq('is_active', true),
    supabase.from('course_enrollments').select(ENROLLMENTS_SELECT).eq('user_id', userId).in('course_id', courseIds),
    supabase.from('certificates').select(CERTIFICATES_SELECT).eq('user_id', userId).in('course_id', courseIds).eq('status', 'issued'),
    supabase.from('payments').select(PAYMENTS_SELECT).eq('user_id', userId).in('course_id', courseIds).order('created_at', { ascending: false }),
  ])

  if (lessonsError) throw lessonsError
  if (modulesError) throw modulesError
  if (enrollmentsError) throw enrollmentsError
  if (certificatesError) throw certificatesError
  if (paymentsError) throw paymentsError

  return {
    courses,
    lessonCountByCourseId: listToGroupedCountMap(lessons, 'course_id'),
    moduleCountByCourseId: listToGroupedCountMap(modules, 'course_id'),
    enrollmentByCourseId: listToMap(enrollments, 'course_id'),
    certificateByCourseId: listToMap(certificates, 'course_id'),
    paymentByCourseId: listToMap(payments, 'course_id'),
  }
}

export const loadExploreCourses = async () => {
  const user = await ensureAuthenticatedUser()
  const bundle = await fetchPublishedCourseBundle(user.id)

  return bundle.courses.map((course) =>
    buildExploreCourse({
      course,
      lessonCount: bundle.lessonCountByCourseId.get(course.id) || 0,
      enrollment: bundle.enrollmentByCourseId.get(course.id),
      certificate: bundle.certificateByCourseId.get(course.id),
      latestPayment: bundle.paymentByCourseId.get(course.id),
    })
  )
}

export const loadMyCourses = async () => {
  const user = await ensureAuthenticatedUser()
  const bundle = await fetchPublishedCourseBundle(user.id)

  return bundle.courses
    .filter((course) => bundle.enrollmentByCourseId.has(course.id))
    .map((course) =>
      buildMyCourse({
        course,
        lessonCount: bundle.lessonCountByCourseId.get(course.id) || 0,
        moduleCount: bundle.moduleCountByCourseId.get(course.id) || 0,
        enrollment: bundle.enrollmentByCourseId.get(course.id),
        certificate: bundle.certificateByCourseId.get(course.id),
      })
    )
}

export const loadMyCertificates = async () => {
  const user = await ensureAuthenticatedUser()

  const { data, error } = await supabase
    .from('certificates')
    .select(`
      id,
      code,
      pdf_url,
      status,
      issued_at,
      created_at,
      courses:course_id (
        id,
        title
      )
    `)
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })

  if (error) throw error

  return data.map((certificate) => ({
    id: certificate.id,
    title: certificate.courses?.title || 'Curso',
    number: certificate.code,
    date: DATE_FORMATTER.format(new Date(certificate.issued_at || certificate.created_at)),
    pdfUrl: certificate.pdf_url,
    status: certificate.status,
  }))
}

export const loadMyPurchases = async () => {
  const user = await ensureAuthenticatedUser()

  const { data, error } = await supabase
    .from('payments')
    .select(`
      id,
      provider_payment_id,
      amount,
      currency,
      status,
      payload,
      paid_at,
      created_at,
      courses:course_id (
        id,
        title
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map((payment) => ({
    id: payment.id,
    title: payment.courses?.title || 'Curso',
    voucher: payment.provider_payment_id || payment.payload?.commerceOrder || 'Sin comprobante',
    date: DATE_FORMATTER.format(new Date(payment.paid_at || payment.created_at)),
    amount: CURRENCY_FORMATTER.format(Number(payment.amount || 0)),
    status: getPaidStateLabel(payment),
    checkoutUrl: payment.payload?.checkoutUrl || null,
    payload: payment.payload,
  }))
}

export const loadCourseDetail = async (courseId) => {
  const user = await ensureAuthenticatedUser()

  const [
    { data: course, error: courseError },
    { data: modules, error: modulesError },
    { data: lessons, error: lessonsError },
    { data: enrollment, error: enrollmentError },
    { data: certificate, error: certificateError },
    { data: payments, error: paymentsError },
  ] = await Promise.all([
    supabase.from('courses').select(COURSES_SELECT).eq('id', courseId).eq('status', 'published').maybeSingle(),
    supabase.from('course_modules').select(MODULES_SELECT).eq('course_id', courseId).eq('is_active', true).order('sort_order', { ascending: true }),
    supabase.from('lessons').select(LESSONS_SELECT).eq('course_id', courseId).eq('is_active', true).order('sort_order', { ascending: true }),
    supabase.from('course_enrollments').select(ENROLLMENTS_SELECT).eq('user_id', user.id).eq('course_id', courseId).maybeSingle(),
    supabase.from('certificates').select(CERTIFICATES_SELECT).eq('user_id', user.id).eq('course_id', courseId).eq('status', 'issued').maybeSingle(),
    supabase.from('payments').select(PAYMENTS_SELECT).eq('user_id', user.id).eq('course_id', courseId).order('created_at', { ascending: false }),
  ])

  if (courseError) throw courseError
  if (modulesError) throw modulesError
  if (lessonsError) throw lessonsError
  if (enrollmentError) throw enrollmentError
  if (certificateError) throw certificateError
  if (paymentsError) throw paymentsError
  if (!course) throw new Error('Curso no encontrado o no publicado.')

  const latestPayment = payments[0] || null
  const action = getExploreAction({ course, enrollment, certificate, latestPayment })
  const lessonsByModuleId = lessons.reduce((map, lesson) => {
    const list = map.get(lesson.module_id) || []
    list.push(lesson)
    map.set(lesson.module_id, list)
    return map
  }, new Map())

  const firstLesson = lessons[0] || null

  return {
    course,
    modules,
    lessons,
    lessonCount: lessons.length,
    enrollment,
    certificate,
    latestPayment,
    action,
    image: getCourseImage(course),
    includes: [
      'Clases en video disponibles 24/7',
      `Acceso por ${course.access_duration_days} dias`,
      lessons.some((lesson) => lesson.material_url) ? 'Material descargable' : 'Acceso a lecciones online',
      'Certificado digital segun reglas del curso',
      'Seguimiento de progreso',
    ],
    modulesWithLessons: modules.map((module) => ({
      ...module,
      lessons: lessonsByModuleId.get(module.id) || [],
    })),
    firstLesson,
  }
}

export const loadCoursePlayer = async (courseId) => {
  const user = await ensureAuthenticatedUser()

  const [
    detail,
    { data: enrollment, error: enrollmentError },
  ] = await Promise.all([
    loadCourseDetail(courseId),
    supabase.from('course_enrollments').select(ENROLLMENTS_SELECT).eq('user_id', user.id).eq('course_id', courseId).maybeSingle(),
  ])

  if (enrollmentError) throw enrollmentError

  return {
    ...detail,
    enrollment,
  }
}

export const createFreeEnrollment = async (courseId) => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError

  const accessToken = sessionData.session?.access_token
  if (!accessToken) throw new Error('No hay sesion activa para inscribirse.')

  const response = await fetch('/api/enrollments/free', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseId }),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || 'No se pudo activar el curso gratuito.')
  }

  return payload
}

export const createFlowCheckout = async ({ courseId, paymentMethod }) => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError

  const accessToken = sessionData.session?.access_token
  if (!accessToken) throw new Error('No hay sesion activa para iniciar el pago.')

  const response = await fetch('/api/payments/flow/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseId, paymentMethod }),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || 'No se pudo crear el checkout de pago.')
  }

  return payload
}
