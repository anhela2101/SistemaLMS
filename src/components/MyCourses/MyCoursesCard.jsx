import React from 'react'
import { Clock, CirclePlay, ChartColumnBig } from 'lucide-react'
import Button from '../generals/Button'

const MyCoursesCard = ({ course }) => {
  if (!course) return null

  const {
    title,
    description,
    duration,
    lessons,
    level,
    image,
    modulesText,
    progress,
    tag,
    tagColor,
    daysLabel,
    cta
  } = course

  return (
    <article className="rounded-lg border border-[#132391]/20 bg-white shadow-sm transition-shadow hover:shadow-lg hover:border-[#132391]/40">
      <div className="relative h-44 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {tag && (
          <span
            className="absolute top-0 left-0 rounded-br-xl px-4 py-2 text-sm font-bold text-white"
            style={{ backgroundColor: tagColor || 'rgba(19, 35, 145, 1)' }}
          >
            {tag}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-4 text-white">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>

          {modulesText && typeof progress === 'number' && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-white/80">
                <span>{modulesText}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: 'rgba(19, 35, 145, 1)' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 px-6 py-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#132391]">
          {duration && (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: 'rgba(19, 35, 145, 1)' }} />
              {duration}
            </span>
          )}
          {lessons && (
            <span className="flex items-center gap-2">
              <CirclePlay className="h-4 w-4" style={{ color: 'rgba(19, 35, 145, 1)' }} />
              {lessons}
            </span>
          )}
          {level && (
            <span className="flex items-center gap-2">
              <ChartColumnBig className="h-4 w-4" style={{ color: 'rgba(19, 35, 145, 1)' }} />
              {level}
            </span>
          )}
        </div>

        <p className="text-sm" style={{ color: 'rgba(19, 35, 145, 1)' }}>
          Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión,
          seguridad y liderazgo.
        </p>

        <div className="flex flex-wrap items-end justify-between gap-4 sm:flex-nowrap">
          {daysLabel && (
            <Button
              type="button"
              variant="outline"
              className="border-[#132391]/30 bg-white px-4 py-2 text-xs text-[#132391] hover:bg-[#132391]/5"
            >
              <span className="font-bold">{daysLabel}</span>
            </Button>
          )}

          {!daysLabel && tag === 'Curso finalizado' && (
            <div
              className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: 'rgba(19, 35, 145, 1)' }}
            >
              <span className="inline-flex items-center gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]">
                  🎓
                </span>
                Curso finalizado
              </span>
            </div>
          )}

          {cta && (
            <Button
              variant="primary"
              className="ml-auto w-[45%] bg-[#132391] text-xs hover:bg-[#0B1B86] sm:text-sm"
            >
              <span className="font-bold">{cta}</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default MyCoursesCard