import React, { useState, useEffect, useRef } from 'react'
import { Search, Layers, ChartColumnBig, ChevronDown, BookOpen, Award, Trophy, LayoutGrid, CircleEllipsis, Clock, CirclePlay, CircleArrowOutUpRight, Lock } from 'lucide-react'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'
import { useNavigate } from 'react-router-dom'
import levelBajo from '../assets/img/level-bajo.svg'
import levelMedio from '../assets/img/level-medio.svg'
import levelAlto from '../assets/img/level-alto.svg'

const courses = [
  //Cursos Pagos
  {
    id: 1,
    title: 'Titulo',
    payment: true,
    tag: 'Pago',
    state: 'finalizado',
    status: 'aprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: 100,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 1,
    title: 'Titulo',
    payment: true,
    tag: 'Pago',
    state: 'finalizado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: 100,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 1,
    title: 'Titulo',
    payment: true,
    tag: 'Pago',
    state: 'iniciado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: 100,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },

  {
    id: 1,
    title: 'Titulo',
    payment: true,
    tag: 'Pago',
    state: 'noIniciado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: 100,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 1,
    title: 'Titulo',
    payment: false,
    tag: 'Pago',
    state: 'noIniciado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: 100,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  //Cursos Gratuitos
  {
    id: 1,
    title: 'Gratuito/finalizado/aprobado',
    payment: false,
    tag: 'Gratuito',
    state: 'finalizado',
    status: 'aprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: null,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 1,
    title: 'Gratuito/finalizado/noAprobado',
    payment: false,
    tag: 'Gratuito',
    state: 'finalizado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Intermedio',
    category: 'General',
    price: null,
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 2,
    title: 'Gratuito/noIniciado/noAprobado',
    payment: false,
    tag: 'Gratuito',
    state: 'noIniciado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Avanzado',
    category: 'General',
    price: '$90,00',
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  },
  {
    id: 3,
    title: 'Gratuito/iniciado/noAprobado MMRR',
    payment: false,
    tag: 'Gratuito',
    state: 'iniciado',
    status: 'noAprobado',
    description: 'Respuesta efectiva en atención crítica y traslados',
    duration: '5 horas',
    lessons: '8 videos',
    level: 'Avanzado',
    category: 'Profesional',
    price: '$90,00',
    image: 'https://jooejlcnudlzqnvcineb.supabase.co/storage/v1/object/public/asociaciones/85df9088-2d17-4979-9033-56c86c335df5/1762229169387-o38jtr.png'
  }
]

const HomePage = () => {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const levelDropdownRef = useRef(null)
  const categoryDropdownRef = useRef(null)

  const handleNavigate = (course) => {
    navigate(`/courses/${course.id}`, {
      state: {
        tag: course.tag,
        payment: course.payment
      }
    })
  }

  const levels = [
    { value: 'Básico', image: levelBajo, color: 'text-green-600' },
    { value: 'Intermedio', image: levelMedio, color: 'text-blue-600' },
    { value: 'Avanzado', image: levelAlto, color: 'text-purple-600' }
  ]

  const categories = [
    'General',
    'Profesional',
  ]

  const filteredCourses = courses.filter(course => {
    const matchesLevel = !selectedLevel || course.level === selectedLevel
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    return matchesLevel && matchesCategory
  })

  const getFreeCourseCta = (course) => {
    // Primero: solo nos interesa si es Gratuito
    if (course.tag === 'Gratuito') {

      if (course.state === 'iniciado') {
        return 'Continuar'
      }

      if (course.state === 'noIniciado') {
        return 'Empezar'
      }
      if (course.state === 'finalizado' && course.status === 'aprobado') {
        return 'Ver certificado'
      }

      if (course.state === 'finalizado' && course.status === 'noAprobado') {
        return 'Volver a ver'
      }
      return 'Empezar'
    }

    // Si NO es Gratuito, no aplican estas reglas
    return null
  }

  const getPaidCourseCta = (course) => {
    if (course.tag !== 'Pago') return null

    const isPaid = course.payment === true
    const isNotPaid = course.payment === false
    const isFinished = course.state === 'terminado' || course.state === 'finalizado'

    // noPagado y noIniciado ----> icono del candado (ya se maneja arriba), mostrar precio, boton comprar
    if (isNotPaid && course.state === 'noIniciado') {
      return 'Comprar'
    }

    // pagado y noIniciado -----> boton  empezar
    if (isPaid && course.state === 'noIniciado') {
      return 'Empezar'
    }

    // pagado y inciado -----> boton continuar
    if (isPaid && course.state === 'iniciado') {
      return 'Continuar'
    }

    // pagado y terminado y noAprobado ----> volver a ver
    if (isPaid && isFinished && course.status === 'noAprobado') {
      return 'Volver a ver'
    }

    // pagado y terminado y aprobado ----> ver certificado
    if (isPaid && isFinished && course.status === 'aprobado') {
      return 'Ver certificado'
    }

    return null
  }

  const getLevelImage = (level) => {
    const levelConfig = levels.find(l => l.value === level)
    return levelConfig ? levelConfig.image : ChartColumnBig
  }

  const getLevelColor = (level) => {
    const levelConfig = levels.find(l => l.value === level)
    return levelConfig ? levelConfig.color : 'text-[#132391]'
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target)) {
        setLevelDropdownOpen(false)
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Buscador */}
        <div className="w-full md:max-w-sm">
          <Input
            placeholder="Buscar"
            iconLeft={<Search />}
            aria-label="Buscar cursos"
          />
        </div>
        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filtro Nivel */}
          <div className="relative" ref={levelDropdownRef}>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#132391]/10"
              style={{ borderColor: 'rgba(40, 52, 126, 1)', color: 'rgba(40, 52, 126, 1)' }}
              onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
            >
              {selectedLevel ? (
                <>
                  <img src={getLevelImage(selectedLevel)} alt={selectedLevel} className="w-4 h-4" />
                  {selectedLevel}
                </>
              ) : (
                <>
                  <ChartColumnBig className="w-4 h-4" />
                  Nivel
                </>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {levelDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#132391]/20 rounded-lg shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-[#132391]/10 flex items-center gap-2 text-sm"
                  onClick={() => {
                    setSelectedLevel('')
                    setLevelDropdownOpen(false)
                  }}
                >
                  <ChartColumnBig className="w-4 h-4 text-[#132391]" />
                  Todos los niveles
                </button>
                {levels.map((level) => (
                  <button
                    key={level.value}
                    className="w-full  px-4 py-2 text-left hover:bg-[#132391]/10 flex items-center gap-2 text-sm"
                    onClick={() => {
                      setSelectedLevel(level.value)
                      setLevelDropdownOpen(false)
                    }}
                  >
                    <img src={level.image} alt={level.value} className="w-4 h-4" />
                    {level.value}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Filtro Categoría */}
          <div className="relative" ref={categoryDropdownRef}>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#132391]/10"
              style={{ borderColor: 'rgba(40, 52, 126, 1)', color: 'rgba(40, 52, 126, 1)' }}
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            >
              <LayoutGrid className="w-4 h-4" />
              {selectedCategory || 'Categoría'}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#132391]/20 rounded-lg shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-[#132391]/10 flex items-center gap-2 text-sm"
                  onClick={() => {
                    setSelectedCategory('')
                    setCategoryDropdownOpen(false)
                  }}
                >
                  <Layers className="w-4 h-4 text-[#132391]" />
                  Todas las categorías
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full px-4 py-2 text-left hover:bg-[#132391]/10 flex items-center gap-2 text-sm"
                    onClick={() => {
                      setSelectedCategory(category)
                      setCategoryDropdownOpen(false)
                    }}
                  >
                    <CircleEllipsis className="w-4 h-4 text-[#132391]" />
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Cursos */}
      <section className="grid gap-6 xl:grid-cols-3 md:grid-cols-2">
        {filteredCourses.map((course) => (
          <article
            key={course.id}
            className={`rounded-lg border border-[#132391]/20 bg-white shadow-sm transition-shadow hover:shadow-lg hover:border-[#132391]/40 ${course.tag ? 'ring-2 ring-[#1CB0B5]' : ''}`}
          >
            <div className="relative h-44 overflow-hidden rounded-t-lg">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {course.payment === false && course.tag !== 'Gratuito' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-15 h-15 text-white" strokeWidth={2} />
                </div>
              )}

              {course.tag === 'Gratuito' && (
                <span className="absolute w-[45%] top-0 left-0 text-white px-4 py-2 rounded-br-xl text-sm font-bold text-center" style={{ backgroundColor: 'rgba(45, 170, 173, 1)' }}>
                  {course.tag}
                </span>
              )}
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-white/80">{course.description}</p>
              </div>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#132391]">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: 'rgba(19, 35, 145, 1)' }} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <CirclePlay className="w-4 h-4" style={{ color: 'rgba(19, 35, 145, 1)' }} />
                  {course.lessons}
                </span>
                <div className="flex items-center gap-2">
                  <img src={getLevelImage(course.level)} alt={course.level} className="w-4 h-4" />
                  <span className="text-sm font-medium" style={{ color: 'rgba(19, 35, 145, 1)' }}>
                    {course.level}
                  </span>
                </div>
              </div>

              <p className="text-sm" style={{ color: 'rgba(19, 35, 145, 1)' }}>
                Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión,
                seguridad y liderazgo.
              </p>

              {/* Zona de acciones inferior */}
              {course.tag === 'Pago' ? (
                // Cursos de pago: línea de precio arriba (si CTA es "Comprar") y debajo Saber más + botón azul
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-end min-h-[2.25rem]">
                    {course.price && getPaidCourseCta(course) === 'Comprar' ? (
                      <span
                        className="rounded-full bg-[#F0F4FF] px-4 py-2 text-sm font-bold text-[#132391]"
                      >
                        $ {course.price}
                      </span>
                    ) : (
                      // Espacio reservado aunque no haya precio
                      <span className="invisible rounded-full px-4 py-2 text-sm font-bold">
                        placeholder
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <Button
                      type="button"
                      onClick={() => handleNavigate(course)}
                      className="text-sm bg-transparent font-bold hover:text-[#0B1B86] flex items-center gap-2"
                      style={{ color: 'rgba(19, 35, 145, 1)' }}
                    >
                      <span className="font-bold" style={{ fontWeight: 900, fontSize: '0.95rem' }}>Saber más</span>
                      <CircleArrowOutUpRight
                        className="w-5 h-5"
                        strokeWidth={3}
                      />
                    </Button>
                    {getPaidCourseCta(course) && (
                      <Button
                        variant="primary"
                        className="bg-[#132391] w-[45%] hover:bg-[#0B1B86] ml-auto"
                        onClick={() => handleNavigate(course)}
                      >
                        <span className="font-bold" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{getPaidCourseCta(course)}</span>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                // Gratuitos y otros
                course.tag === 'Gratuito' ? (
                  // Gratuitos: también reservan una línea superior vacía y debajo botones alineados
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-end min-h-[2.25rem]">
                      <span className="invisible rounded-full px-4 py-2 text-sm font-bold">
                        placeholder
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 flex-wrap sm:flex-nowrap">
                      <Button
                        type="button"
                        onClick={() => handleNavigate(course)}
                        className="text-sm bg-transparent font-bold hover:text-[#0B1B86] flex items-center gap-2"
                        style={{ color: 'rgba(19, 35, 145, 1)' }}
                      >
                        <span className="font-bold" style={{ fontWeight: 900, fontSize: '0.95rem' }}>Saber más</span>
                        <CircleArrowOutUpRight
                          className="w-5 h-5"
                          strokeWidth={3}
                        />
                      </Button>
                      <Button
                        variant="primary"
                        className="bg-[#132391] w-[45%] hover:bg-[#0B1B86] ml-auto"
                        onClick={() => handleNavigate(course)}
                      >
                        <span className="font-bold" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{getFreeCourseCta(course)}</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Otros casos: una sola fila con Saber más a la izquierda y botón azul a la derecha
                  <div className="flex items-end justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <Button
                      type="button"
                      onClick={() => handleNavigate(course)}
                      className="text-sm bg-transparent font-bold hover:text-[#0B1B86] flex items-center gap-2"
                      style={{ color: 'rgba(19, 35, 145, 1)' }}
                    >
                      <span className="font-bold" style={{ fontWeight: 900, fontSize: '0.95rem' }}>Saber más</span>
                      <CircleArrowOutUpRight
                        className="w-5 h-5"
                        strokeWidth={3}
                      />
                    </Button>
                    {course.price ? (
                      <Button
                        variant="primary"
                        className="bg-[#132391] w-[45%] hover:bg-[#0B1B86] ml-auto"
                        onClick={() => handleNavigate(course)}
                      >
                        <span className="font-bold" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{course.cta}</span>
                      </Button>
                    ) : null}
                  </div>
                )
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage