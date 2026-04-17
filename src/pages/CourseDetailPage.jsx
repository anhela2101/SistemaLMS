import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Clock,
  Video,
  Users,
  ShieldCheck,
  Award,
  CircleCheck,
  Calendar,
  FileDown,
  FilePenLine,
  Youtube,
  Loader2,
} from 'lucide-react'
import PaymentMethod from '../components/courseDetails/paymentMethod'
import FreeMethod from '../components/courseDetails/freeMethod'
import { createFlowCheckout, createFreeEnrollment, loadCourseDetail } from '../lib/lmsData'
import { isBunnyStreamPlayUrl } from '../lib/bunnyVideo'

const endorsements = [
  'Centro de Entrenamiento Internacional Dr. Vigo RCP',
  'MEDCRI - Centro de Entrenamiento Internacional',
]

const CourseDetailPage = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchDetail = async () => {
      setLoading(true)
      setErrorMessage('')

      try {
        const data = await loadCourseDetail(courseId)
        if (isMounted) {
          setDetail(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudo cargar el curso.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchDetail()

    return () => {
      isMounted = false
    }
  }, [courseId])

  const refreshDetail = async () => {
    const data = await loadCourseDetail(courseId)
    setDetail(data)
  }

  const handleFreeStart = async () => {
    if (!detail) return

    if (detail.action?.action === 'start') {
      navigate(`/course-start/${detail.course.id}`)
      return
    }

    if (detail.action?.action === 'certificates') {
      navigate('/my-certificates')
      return
    }

    setActionLoading(true)
    setErrorMessage('')

    try {
      await createFreeEnrollment(detail.course.id)
      navigate(`/course-start/${detail.course.id}`)
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo activar el curso gratuito.')
    } finally {
      setActionLoading(false)
    }
  }

  const handlePaidCheckout = async (paymentMethod) => {
    if (!detail) return

    if (detail.action?.action === 'start') {
      navigate(`/course-start/${detail.course.id}`)
      return
    }

    if (detail.action?.action === 'certificates') {
      navigate('/my-certificates')
      return
    }

    if (detail.action?.action === 'purchases') {
      navigate('/my-purchases')
      return
    }

    setActionLoading(true)
    setErrorMessage('')

    try {
      const payload = await createFlowCheckout({
        courseId: detail.course.id,
        paymentMethod,
      })

      window.location.assign(payload.checkoutUrl)
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo iniciar el pago con Flow.')
      await refreshDetail()
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-sm text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando curso...
      </div>
    )
  }

  if (errorMessage && !detail) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMessage}
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="rounded-lg border border-[#132391]/15 bg-white px-4 py-3 text-sm text-gray-500">
        Curso no disponible.
      </div>
    )
  }

  const { course, lessonCount, firstLesson } = detail
  const isFree = course.course_type === 'free'
  const paidStatusLabel = detail.latestPayment?.status === 'pending' ? 'Tienes un pago pendiente para este curso.' : null
  const isStreamEmbed = isBunnyStreamPlayUrl(firstLesson?.bunny_video_url)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-6">
        <header className="space-y-3">
          <div>
            <h1 className="text-3xl font-bold uppercase text-[#0B1B86]">{course.title}</h1>
            <p className="text-lg text-[#132391]/80">{course.description}</p>
          </div>

          <div className="overflow-hidden rounded-lg bg-black">
            <div className="relative h-72 w-full">
              {firstLesson?.bunny_video_url ? (
                isStreamEmbed ? (
                  <iframe
                    src={firstLesson.bunny_video_url}
                    title={firstLesson?.title || course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    poster={detail.image}
                  >
                    <source src={firstLesson.bunny_video_url} type="video/mp4" />
                    Tu navegador no soporta la reproduccion de video.
                  </video>
                )
              ) : (
                <img src={detail.image} alt={course.title} className="h-full w-full object-cover" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-4 text-sm text-[#132391] sm:flex-nowrap">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {course.access_duration_days} dias acceso
            </span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              {lessonCount} {lessonCount === 1 ? 'leccion' : 'lecciones'}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              {course.level || 'General'}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {detail.enrollment ? 'Acceso activo' : 'Disponible'}
            </span>
          </div>
        </header>

        <article className="space-y-6 rounded-lg bg-white p-8 shadow-sm">
          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <p className="text-base text-gray-600">
            Este curso fue publicado desde el panel administrativo y su contenido se sirve desde Supabase para la experiencia del alumno.
          </p>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[#0B1B86]">Modulos del curso</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {detail.modulesWithLessons.map((module) => (
                <li key={module.id} className="rounded-lg border border-[#132391]/10 px-4 py-3">
                  <p className="font-semibold text-[#132391]">{module.title}</p>
                  <p className="text-xs text-gray-500">
                    {module.lessons.length} {module.lessons.length === 1 ? 'leccion' : 'lecciones'}
                  </p>
                  {module.description ? <p className="mt-2 text-sm text-gray-600">{module.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <aside className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#F7F9FF' }}>
        <div className="space-y-6">
          <div className="border-b pb-6" style={{ borderColor: 'rgba(28, 101, 166, 1)' }}>
            <h3 className="text-lg font-semibold text-[#0B1B86]">Valor del curso</h3>

            {!isFree ? (
              <PaymentMethod
                priceLabel={new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                  minimumFractionDigits: 2,
                }).format(Number(course.price || 0))}
                ctaLabel={detail.action?.label || 'Comprar'}
                currentStatusLabel={paidStatusLabel}
                onCheckout={handlePaidCheckout}
                loading={actionLoading}
                disabled={detail.action?.disabled}
              />
            ) : (
              <FreeMethod
                ctaLabel={detail.action?.label || 'Empezar'}
                onStart={handleFreeStart}
                loading={actionLoading}
                disabled={detail.action?.disabled}
              />
            )}

            <div className="mt-6 border-b" style={{ borderColor: 'rgba(28, 101, 166, 1)' }} />

            <div className="mt-6 space-y-3">
              <h4 className="mb-8 text-md font-bold text-[#0B1B86]">Incluye</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                {detail.includes.map((label) => {
                  const icon =
                    label.includes('video') ? Youtube :
                    label.includes('dias') ? Calendar :
                    label.includes('Material') ? FileDown :
                    label.includes('Certificado') ? Award :
                    FilePenLine

                  const Icon = icon

                  return (
                    <li key={label} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#132391]" />
                      {label}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <div className="border-b pb-8" style={{ borderColor: 'rgba(28, 101, 166, 1)' }}>
              <h4 className="text-md font-bold text-[#0B1B86]">Respaldo oficial de:</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {endorsements.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CircleCheck className="w-4 h-4 text-[#132391]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CourseDetailPage
