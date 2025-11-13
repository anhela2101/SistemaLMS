import React from 'react'
import { Search, Layers, BarChart3 } from 'lucide-react'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'
import { useNavigate } from 'react-router-dom'

const courses = [
  {
    id: 1,
    title: 'REACT® – I',
    description: 'Respuesta efectiva en atención crítica y traslados',
    tag: 'Gratuito',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    cta: 'Empezar',
    price: null,
    image: 'https://images.unsplash.com/photo-1580281780460-82d277b0e3e1?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    title: 'REACT® – II',
    description: 'Respuesta efectiva en atención crítica y traslados',
    tag: null,
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Avanzado',
    cta: 'Saber más',
    price: '$90,00',
    image: 'https://images.unsplash.com/photo-1584559582280-393d19d4d449?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    title: 'REACT® – III',
    description: 'Respuesta efectiva en atención crítica y traslados',
    tag: null,
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Avanzado',
    cta: 'Saber más',
    price: '$90,00',
    image: 'https://images.unsplash.com/photo-1580281658629-631cef5fd2aa?auto=format&fit=crop&w=800&q=60'
  }
]

const HomePage = () => {
  const navigate = useNavigate()

  const handleNavigate = (courseId) => {
    navigate(`/courses/${courseId}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-sm">
          <Input
            placeholder="Buscar"
            iconLeft={<Search />}
            aria-label="Buscar cursos"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#132391] text-[#132391] hover:bg-[#132391]/10"
          >
            <BarChart3 className="w-4 h-4" />
            Nivel
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#132391] text-[#132391] hover:bg-[#132391]/10"
          >
            <Layers className="w-4 h-4" />
            Categoría
          </Button>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-3 md:grid-cols-2">
        {courses.map((course) => (
          <article
            key={course.id}
            className={`rounded-3xl border border-[#132391]/20 bg-white shadow-sm transition-shadow hover:shadow-lg hover:border-[#132391]/40 ${course.tag ? 'ring-2 ring-[#1CB0B5]' : ''}`}
          >
            <div className="relative h-44 overflow-hidden rounded-t-3xl">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {course.tag && (
                <span className="absolute top-4 left-4 rounded-full bg-[#1CB0B5] px-3 py-1 text-xs font-bold uppercase text-white">
                  {course.tag}
                </span>
              )}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-white/80">{course.description}</p>
              </div>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#132391]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#132391]" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#132391]" />
                  {course.lessons}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#132391]" />
                  {course.level}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión,
                seguridad y liderazgo.
              </p>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={() => handleNavigate(course.id)}
                  className="text-sm font-semibold text-[#132391] hover:text-[#0B1B86]"
                >
                  Saber más
                </Button>

                {course.price ? (
                  <span className="rounded-full bg-[#F0F4FF] px-4 py-2 text-sm font-bold text-[#132391]">
                    {course.price}
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    className="bg-[#132391] hover:bg-[#0B1B86]"
                    onClick={() => handleNavigate(course.id)}
                  >
                    {course.cta}
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage