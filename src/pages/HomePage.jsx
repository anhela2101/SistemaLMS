import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Search,
  Layers,
  ChartColumnBig,
  ChevronDown,
  LayoutGrid,
  CircleEllipsis,
  Clock,
  CirclePlay,
  CircleArrowOutUpRight,
  Lock,
  Loader2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'
import { createFreeEnrollment, loadExploreCourses } from '../lib/lmsData'

const levelColors = {
  Basico: 'text-green-600',
  Intermedio: 'text-blue-600',
  Avanzado: 'text-rose-600',
}

const HomePage = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState(null)

  const levelDropdownRef = useRef(null)
  const categoryDropdownRef = useRef(null)

  const levels = useMemo(() => {
    return Array.from(new Set(courses.map((course) => course.level).filter(Boolean)))
  }, [courses])

  const categories = useMemo(() => {
    return Array.from(new Set(courses.map((course) => course.category).filter(Boolean)))
  }, [courses])

  useEffect(() => {
    let isMounted = true

    const fetchCourses = async () => {
      setLoading(true)
      setErrorMessage('')

      try {
        const data = await loadExploreCourses()
        if (isMounted) {
          setCourses(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudieron cargar los cursos.')
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
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return courses.filter((course) => {
      const matchesSearch =
        !normalizedSearch ||
        course.title.toLowerCase().includes(normalizedSearch) ||
        course.description.toLowerCase().includes(normalizedSearch)
      const matchesLevel = !selectedLevel || course.level === selectedLevel
      const matchesCategory = !selectedCategory || course.category === selectedCategory

      return matchesSearch && matchesLevel && matchesCategory
    })
  }, [courses, searchTerm, selectedLevel, selectedCategory])

  const handleCardAction = async (course) => {
    if (course.action?.disabled) return

    if (course.action?.action === 'certificates') {
      navigate('/my-certificates')
      return
    }

    if (course.action?.action === 'purchases') {
      navigate('/my-purchases')
      return
    }

    if (course.action?.action === 'start') {
      navigate(`/course-start/${course.id}`)
      return
    }

    if (course.action?.action === 'enroll') {
      try {
        setActionLoadingId(course.id)
        await createFreeEnrollment(course.id)
        navigate(`/course-start/${course.id}`)
      } catch (error) {
        setErrorMessage(error.message || 'No se pudo activar el curso gratuito.')
      } finally {
        setActionLoadingId(null)
      }
      return
    }

    navigate(`/courses/${course.id}`)
  }

  const getLevelColor = (level) => levelColors[level] || 'text-[#132391]'

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-sm text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando cursos...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-sm">
          <Input
            placeholder="Buscar cursos"
            iconLeft={<Search />}
            aria-label="Buscar cursos"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative" ref={levelDropdownRef}>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#132391]/10"
              style={{ borderColor: 'rgba(40, 52, 126, 1)', color: 'rgba(40, 52, 126, 1)' }}
              onClick={() => setLevelDropdownOpen((current) => !current)}
            >
              <ChartColumnBig className="w-4 h-4" />
              {selectedLevel || 'Nivel'}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {levelDropdownOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-lg border border-[#132391]/20 bg-white shadow-lg">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#132391]/10"
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
                    key={level}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#132391]/10"
                    onClick={() => {
                      setSelectedLevel(level)
                      setLevelDropdownOpen(false)
                    }}
                  >
                    <ChartColumnBig className={`w-4 h-4 ${getLevelColor(level)}`} />
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={categoryDropdownRef}>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#132391]/10"
              style={{ borderColor: 'rgba(40, 52, 126, 1)', color: 'rgba(40, 52, 126, 1)' }}
              onClick={() => setCategoryDropdownOpen((current) => !current)}
            >
              <LayoutGrid className="w-4 h-4" />
              {selectedCategory || 'Categoria'}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-lg border border-[#132391]/20 bg-white shadow-lg">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#132391]/10"
                  onClick={() => {
                    setSelectedCategory('')
                    setCategoryDropdownOpen(false)
                  }}
                >
                  <Layers className="w-4 h-4 text-[#132391]" />
                  Todas las categorias
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#132391]/10"
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

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {!filteredCourses.length ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-dashed border-[#132391]/20 bg-white text-sm text-gray-500">
          No hay cursos para los filtros seleccionados.
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className="rounded-lg border border-[#132391]/20 bg-white shadow-sm transition-shadow hover:border-[#132391]/40 hover:shadow-lg"
            >
              <div className="relative h-44 overflow-hidden rounded-t-lg">
                <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {!course.isAccessible && course.typeLabel !== 'Gratuito' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-12 w-12 text-white" strokeWidth={2} />
                  </div>
                )}

                <span
                  className="absolute top-0 left-0 rounded-br-xl px-4 py-2 text-sm font-bold text-white"
                  style={{
                    backgroundColor:
                      course.typeLabel === 'Gratuito' ? 'rgba(45, 170, 173, 1)' : 'rgba(19, 35, 145, 1)',
                  }}
                >
                  {course.typeLabel}
                </span>

                <div className="absolute right-4 bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-white/80">{course.description}</p>
                </div>
              </div>

              <div className="space-y-4 px-6 py-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#132391]">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {course.durationLabel}
                  </span>
                  <span className="flex items-center gap-2">
                    <CirclePlay className="w-4 h-4" />
                    {course.lessonsLabel}
                  </span>
                  <span className={`flex items-center gap-2 font-medium ${getLevelColor(course.level)}`}>
                    <ChartColumnBig className="w-4 h-4" />
                    {course.level}
                  </span>
                </div>

                <p className="text-sm text-[#132391]">
                  Accede al contenido publicado desde el panel administrativo y sigue tu progreso desde tu cuenta.
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex min-h-[2.25rem] justify-end">
                    {course.priceLabel ? (
                      <span className="rounded-full bg-[#F0F4FF] px-4 py-2 text-sm font-bold text-[#132391]">
                        {course.priceLabel}
                      </span>
                    ) : (
                      <span className="invisible rounded-full px-4 py-2 text-sm font-bold">placeholder</span>
                    )}
                  </div>

                  <div className="flex items-end justify-between gap-4 flex-wrap sm:flex-nowrap">
                    <Button
                      type="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="flex items-center gap-2 bg-transparent text-sm font-bold hover:text-[#0B1B86]"
                      style={{ color: 'rgba(19, 35, 145, 1)' }}
                    >
                      <span className="font-bold" style={{ fontWeight: 900, fontSize: '0.95rem' }}>
                        Saber mas
                      </span>
                      <CircleArrowOutUpRight className="w-5 h-5" strokeWidth={3} />
                    </Button>

                    <Button
                      variant="primary"
                      className="ml-auto w-[45%] bg-[#132391] hover:bg-[#0B1B86]"
                      onClick={() => handleCardAction(course)}
                      disabled={Boolean(course.action?.disabled) || actionLoadingId === course.id}
                    >
                      <span className="flex items-center justify-center gap-2 font-bold" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {actionLoadingId === course.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {course.action?.label || 'Ver curso'}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

export default HomePage
