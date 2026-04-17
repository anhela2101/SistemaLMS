import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, MessageSquare } from 'lucide-react'
import { isBunnyStreamPlayUrl } from '../../lib/bunnyVideo'

const CoursePlayer = ({ courseTitle, courseDescription, lesson, fallbackImage }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress] = useState(35)
  const isStreamEmbed = isBunnyStreamPlayUrl(lesson?.bunny_video_url)

  const togglePlay = () => setIsPlaying((current) => !current)
  const toggleMute = () => setIsMuted((current) => !current)

  return (
    <div className="space-y-6">
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {isStreamEmbed ? (
          <iframe
            src={lesson.bunny_video_url}
            title={lesson?.title || courseTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : lesson?.bunny_video_url ? (
          <video
            src={lesson.bunny_video_url}
            poster={fallbackImage}
            muted={isMuted}
            controls
            className="h-full w-full object-cover opacity-90"
          />
        ) : (
          <img
            src={fallbackImage}
            alt={courseTitle}
            className="h-full w-full object-cover opacity-80"
          />
        )}

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#132391]/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="ml-1 h-8 w-8 fill-current" />}
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="mb-4 h-1 w-full cursor-pointer rounded-full bg-white/30">
            <div className="h-full rounded-full bg-[#132391]" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="transition-colors hover:text-[#132391]">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button className="transition-colors hover:text-[#132391]">
                <SkipBack className="h-5 w-5" />
              </button>
              <button className="transition-colors hover:text-[#132391]">
                <SkipForward className="h-5 w-5" />
              </button>
              <button onClick={toggleMute} className="transition-colors hover:text-[#132391]">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <span className="text-xs font-medium">{lesson?.bunny_video_url ? 'Streaming habilitado' : 'Vista previa del curso'}</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="transition-colors hover:text-[#132391]">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="transition-colors hover:text-[#132391]">
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#132391]">Descripcion</h2>
        <p className="leading-relaxed text-gray-600">{lesson?.description || courseDescription}</p>
      </div>
    </div>
  )
}

export default CoursePlayer
