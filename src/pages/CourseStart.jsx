import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MoveLeft, Loader2 } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import CoursePlayer from '../components/CourseStart/CoursePlayer'
import CourseSidebar from '../components/CourseStart/CourseSidebar'
import { loadCoursePlayer } from '../lib/lmsData'

const CourseStart = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchPlayer = async () => {
      try {
        const data = await loadCoursePlayer(courseId)
        if (isMounted) {
          setDetail(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudo cargar el contenido del curso.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPlayer()

    return () => {
      isMounted = false
    }
  }, [courseId])

  const title = (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center justify-center rounded-full border border-[#132391]/20 p-1 text-[#132391] transition-colors hover:bg-[#132391]/5"
        aria-label="Volver a la pagina anterior"
      >
        <MoveLeft className="w-5 h-5" />
      </button>
      <span>Capacitacion en curso</span>
    </span>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando curso...
      </div>
    )
  }

  if (errorMessage || !detail?.enrollment) {
    return (
      <div className="min-h-screen bg-white p-6">
        <Navbar title={title} />
        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage || 'No tienes acceso activo a este curso.'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar title={title} />

      <main className="flex-1 px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#132391]">{detail.course.title}</h1>
          <p className="text-lg font-medium text-[#132391]">{detail.course.description}</p>
        </div>

        <div className="grid h-[calc(100vh-200px)] gap-8 lg:grid-cols-[1fr_400px]">
          <div className="overflow-y-auto pr-2">
            <CoursePlayer
              courseTitle={detail.course.title}
              courseDescription={detail.course.description}
              lesson={detail.firstLesson}
              fallbackImage={detail.image}
            />
          </div>

          <div className="h-full">
            <CourseSidebar
              modules={detail.modulesWithLessons}
              enrollment={detail.enrollment}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CourseStart
