import React, { useEffect, useState } from 'react'
import MyCoursesCard from '../components/MyCourses/MyCoursesCard'
import { loadMyCourses } from '../lib/lmsData'

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchCourses = async () => {
      try {
        const data = await loadMyCourses()
        if (isMounted) {
          setCourses(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudieron cargar tus cursos.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCourses()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Cargando tus cursos...
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMessage}
      </div>
    )
  }

  if (!courses.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Aun no tienes cursos activos o asignados.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="border-t" style={{ borderColor: '#E5E7EB' }} />
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <MyCoursesCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  )
}

export default MyCoursesPage
