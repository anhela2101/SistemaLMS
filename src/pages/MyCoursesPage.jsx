import React, { useEffect, useState } from 'react'
import MyCoursesCard from '../components/MyCourses/MyCoursesCard'

// Simulación de consulta a Supabase por cursos del usuario
const fetchUserCourses = async (userId) => {
  const mockImage = 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'

  // Aquí iría la llamada real a Supabase, por ejemplo:
  // const { data, error } = await supabase
  //   .from('courses_users')
  //   .select('*')
  //   .eq('user_id', userId)

  // De momento devolvemos datos mockeados con distintos estados
  return [
    {
      id: 1,
      title: 'REACT® – I',
      description: 'Respuesta efectiva en atención crítica y traslados',
      duration: '5 horas',
      lessons: '8 videos',
      level: 'Intermedio',
      image: mockImage,
      modulesText: '4/8 Módulos',
      progress: 50,
      tag: null,
      daysLabel: '20 días',
      cta: 'Continuar'
    },
    {
      id: 2,
      title: 'REACT® – I',
      description: 'Respuesta efectiva en atención crítica y traslados',
      duration: '5 horas',
      lessons: '8 videos',
      level: 'Intermedio',
      image: mockImage,
      modulesText: '8/8 Módulos',
      progress: 100,
      tag: null,
      daysLabel: '30 días',
      cta: 'Volver a ver'
    },
    {
      id: 3,
      title: 'REACT® – I',
      description: 'Respuesta efectiva en atención crítica y traslados',
      duration: '5 horas',
      lessons: '8 videos',
      level: 'Intermedio',
      image: mockImage,
      modulesText: '8/8 Módulos',
      progress: 100,
      tag: 'Curso finalizado',
      tagColor: 'rgba(19, 35, 145, 1)',
      daysLabel: null,
      cta: 'Ver certificado'
    },
    {
      id: 4,
      title: 'REACT® – I',
      description: 'Respuesta efectiva en atención crítica y traslados',
      duration: '5 horas',
      lessons: '8 videos',
      level: 'Intermedio',
      image: mockImage,
      modulesText: '6/8 Módulos',
      progress: 80,
      tag: 'Gratis',
      tagColor: 'rgba(45, 170, 173, 1)',
      daysLabel: '00 días',
      cta: 'Ampliar 7 días'
    },
    {
      id: 5,
      title: 'REACT® – I',
      description: 'Respuesta efectiva en atención crítica y traslados',
      duration: '5 horas',
      lessons: '8 videos',
      level: 'Intermedio',
      image: mockImage,
      modulesText: '6/8 Módulos',
      progress: 80,
      tag: '$ 00,00',
      tagColor: 'rgba(19, 35, 145, 1)',
      daysLabel: '00 días',
      cta: 'Quiero ampliar'
    }
  ]
}

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // En un escenario real, este userId vendría del contexto de autenticación
  const userId = 'usuario-demo-123'

  useEffect(() => {
    let isMounted = true

    const loadCourses = async () => {
      try {
        const data = await fetchUserCourses(userId)
        if (isMounted) {
          setCourses(data)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCourses()

    return () => {
      isMounted = false
    }
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Cargando tus cursos...
      </div>
    )
  }

  if (!courses.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Aún no tienes cursos asignados.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div
        className="border-t"
        style={{ borderColor: '#E5E7EB' }}
      />
      <section className="grid gap-6 xl:grid-cols-3 md:grid-cols-2">
        {courses.map((course) => (
          <MyCoursesCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  )
}

export default MyCoursesPage
