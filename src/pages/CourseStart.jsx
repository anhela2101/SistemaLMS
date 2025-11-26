import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import CoursePlayer from '../components/CourseStart/CoursePlayer'
import CourseSidebar from '../components/CourseStart/CourseSidebar'

const CourseStart = () => {
    const navigate = useNavigate()

    const title = (
        <span className="inline-flex items-center gap-2">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center justify-center rounded-full border border-[#132391]/20 p-1 text-[#132391] hover:bg-[#132391]/5 transition-colors"
                aria-label="Volver a la página anterior"
            >
                <MoveLeft className="w-5 h-5" />
            </button>
            <span>Capacitación en curso</span>
        </span>
    )

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar title={title} />

            <main className="flex-1 px-6 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#132391]">REACT® – I</h1>
                    <p className="text-lg font-medium text-[#132391]">
                        Respuesta Efectiva en Atención Crítica y Traslados
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_400px] h-[calc(100vh-200px)]">
                    <div className="overflow-y-auto pr-2">
                        <CoursePlayer />
                    </div>

                    <div className="h-full">
                        <CourseSidebar />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CourseStart