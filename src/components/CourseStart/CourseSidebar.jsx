import React, { useMemo, useState } from 'react'
import { CheckCircle2, Circle, PlayCircle, FileText, ChevronDown, ChevronUp, X, FileCheck, Trophy } from 'lucide-react'

const CourseSidebar = ({ modules = [], enrollment }) => {
  const initialState = useMemo(() => {
    if (!modules.length) return {}
    return { [`module-${modules[0].id}`]: true }
  }, [modules])

  const [openSections, setOpenSections] = useState(initialState)

  const toggleSection = (sectionKey) => {
    setOpenSections((current) => ({
      ...current,
      [sectionKey]: !current[sectionKey],
    }))
  }

  const renderIcon = (lesson) => {
    if (lesson.material_url) {
      return <FileText className="h-3.5 w-3.5 text-orange-500" />
    }

    return <PlayCircle className="h-3.5 w-3.5" />
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-[#132391] px-6 py-4 text-white">
        <h3 className="font-semibold">Contenido del curso</h3>
        <button className="rounded-full p-1 transition-colors hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {modules.map((module, index) => {
          const isOpen = openSections[`module-${module.id}`]
          const lessonCount = module.lessons.length
          const estimatedCompletedItems = Math.round((Number(enrollment?.progress_percent || 0) / 100) * Math.max(lessonCount, 1))
          const lessonStartIndex = modules
            .slice(0, index)
            .reduce((total, currentModule) => total + currentModule.lessons.length, 0)
          const estimatedDone = Math.ceil(
            (Number(enrollment?.progress_percent || 0) / 100) * modules.flatMap((item) => item.lessons).length
          )

          return (
            <div key={module.id} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggleSection(`module-${module.id}`)}
                className={`flex w-full items-start justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50 ${
                  isOpen ? 'bg-blue-50/30' : 'bg-gray-50/50'
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#132391] text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#132391]">{module.title}</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {Math.min(estimatedCompletedItems, lessonCount)}/{lessonCount} • {lessonCount} {lessonCount === 1 ? 'leccion' : 'lecciones'}
                    </p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-[#132391]" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>

              {isOpen ? (
                <div className="bg-white">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const completed = lessonStartIndex + lessonIndex < estimatedDone

                    return (
                      <div key={lesson.id} className="relative flex gap-4 px-6 py-4 transition-colors hover:bg-gray-50">
                        {lessonIndex === 0 ? <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#2DAAAD]" /> : null}

                        <div className="mt-1 shrink-0">
                          {completed ? <CheckCircle2 className="h-5 w-5 text-[#2DAAAD]" /> : <Circle className="h-5 w-5 text-gray-300" />}
                        </div>

                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium text-[#132391]">{lesson.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {renderIcon(lesson)}
                            <span>{lesson.material_url ? 'Material complementario' : 'Video online'}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}

        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('exam')}
            className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 ${
              openSections.exam ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                <FileCheck className="h-5 w-5 text-[#132391]" />
              </div>
              <span className="text-sm font-bold text-[#132391]">Examen final</span>
            </div>
            {openSections.exam ? <ChevronUp className="h-5 w-5 text-[#132391]" /> : <ChevronDown className="h-5 w-5 text-[#132391]" />}
          </button>

          {openSections.exam ? (
            <div className="space-y-4 bg-gray-50/30 px-6 py-6 text-sm text-[#132391]/80">
              <p>La configuracion final del examen sigue pendiente de implementacion desde el panel admin.</p>
              <p>Este bloque queda preparado para consumir intentos y resultados cuando exista el esquema de examenes.</p>
            </div>
          ) : null}
        </div>

        <div>
          <button
            onClick={() => toggleSection('results')}
            className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 ${
              openSections.results ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                <Trophy className="h-5 w-5 text-[#132391]" />
              </div>
              <span className="text-sm font-bold text-[#132391]">Progreso</span>
            </div>
            {openSections.results ? <ChevronUp className="h-5 w-5 text-[#132391]" /> : <ChevronDown className="h-5 w-5 text-[#132391]" />}
          </button>

          {openSections.results ? (
            <div className="space-y-4 bg-gray-50/30 px-6 py-6 text-sm text-[#132391]">
              <div className="flex gap-1">
                <span className="font-bold">Avance:</span>
                <span>{Number(enrollment?.progress_percent || 0)}%</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Estado:</span>
                <span>{enrollment?.access_status || 'active'}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CourseSidebar
