import React, { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, MessageSquare } from 'lucide-react'

const CoursePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(35) // Mock progress

    const togglePlay = () => setIsPlaying(!isPlaying)
    const toggleMute = () => setIsMuted(!isMuted)

    return (
        <div className="space-y-6">
            {/* Video Container */}
            <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                {/* Placeholder Image */}
                <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Video thumbnail"
                    className="h-full w-full object-cover opacity-80"
                />

                {/* Big Play Button (Centered) */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    <button
                        onClick={togglePlay}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#132391]/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                    >
                        {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
                    </button>
                </div>

                {/* Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-4 opacity-0 transition-opacity group-hover:opacity-100">
                    {/* Progress Bar */}
                    <div className="mb-4 h-1 w-full cursor-pointer rounded-full bg-white/30">
                        <div
                            className="h-full rounded-full bg-[#132391]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="hover:text-[#132391] transition-colors">
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </button>

                            <button className="hover:text-[#132391] transition-colors">
                                <SkipBack className="h-5 w-5" />
                            </button>

                            <button className="hover:text-[#132391] transition-colors">
                                <SkipForward className="h-5 w-5" />
                            </button>

                            <div className="flex items-center gap-2 group/volume">
                                <button onClick={toggleMute} className="hover:text-[#132391] transition-colors">
                                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                </button>
                                <div className="w-0 overflow-hidden transition-all group-hover/volume:w-20">
                                    <div className="h-1 w-20 rounded-full bg-white/30">
                                        <div className="h-full w-3/4 rounded-full bg-white" />
                                    </div>
                                </div>
                            </div>

                            <span className="text-xs font-medium">04:20 / 12:30</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="hover:text-[#132391] transition-colors">
                                <MessageSquare className="h-5 w-5" />
                            </button>
                            <button className="hover:text-[#132391] transition-colors">
                                <Settings className="h-5 w-5" />
                            </button>
                            <button className="hover:text-[#132391] transition-colors">
                                <Maximize className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#132391]">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">
                    Aprende los componentes esenciales de la organización de un sistema de respuesta prehospitalaria y su impacto en la atención crítica.
                    Este módulo cubre los protocolos fundamentales y las mejores prácticas para garantizar una atención eficiente y segura.
                </p>
            </div>
        </div>
    )
}

export default CoursePlayer
