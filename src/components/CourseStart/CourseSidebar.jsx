import React, { useState } from 'react'
import { CheckCircle2, Circle, PlayCircle, FileText, ChevronDown, ChevronUp, X, FileCheck, Trophy } from 'lucide-react'

// Simulación de datos provenientes de una base de datos
const courseData = {
    modules: [
        {
            id: 1,
            title: 'Fundamentos del sistema de respuesta prehospitalaria',
            duration: '10 min',
            completed_items: 2,
            total_items: 2,
            lessons: [
                {
                    id: 101,
                    title: 'Organización del sistema de emergencias',
                    type: 'video',
                    duration: '5 min',
                    completed: true,
                    current: true
                },
                {
                    id: 102,
                    title: 'Cadena de supervivencia',
                    type: 'video',
                    duration: '5 min',
                    completed: false,
                    current: false
                },
                {
                    id: 103,
                    title: 'Respuesta Prehospitalaria: Principios y Fundamentos',
                    type: 'pdf',
                    duration: 'Lectura recomendada',
                    completed: false,
                    current: false
                }
            ]
        },
        {
            id: 2,
            title: 'Evaluación ABCDE del paciente en campo',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: [
                {
                    id: 201,
                    title: 'Evaluación Primaria',
                    type: 'video',
                    duration: '8 min',
                    completed: true,
                    current: false
                }
            ]
        },
        {
            id: 3,
            title: 'Uso del maletín de emergencias y oxigenoterapia inicial',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        },
        {
            id: 4,
            title: 'RCP básica prehospitalaria – protocolo actualizado',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        },
        {
            id: 5,
            title: 'Manejo básico de vía aérea y uso del DEA',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        },
        {
            id: 6,
            title: 'Principios de traslado y estabilización',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        },
        {
            id: 7,
            title: 'Abordaje inicial de trauma y shock',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        },
        {
            id: 8,
            title: 'Introducción al trabajo en equipo prehospitalario',
            duration: '8 min',
            completed_items: 1,
            total_items: 1,
            lessons: []
        }
    ],
    exam: {
        id: 'exam',
        title: 'Examen',
        status: 'pending', // pending, passed, failed
        min_score: 80,
        attempts: 0,
        last_attempt_date: null,
        details: [
            'Apruebas con un 80% de respuestas correctas.',
            'Una vez aprobado, no podrás volver a tomarlo.',
            'Reintentos sin límite',
            'Al finalizar, tendrás disponible el detalle de tus respuestas.'
        ]
    },
    results: {
        id: 'results',
        title: 'Resultados',
        available: true,
        last_exam_date: '25 de Septiembre de 2025',
        attempts: 1,
        status: 'Desaprobado',
        score_text: '5 de 6 respuestas correctas.'
    }
}

const CourseSidebar = () => {
    // Estado para manejar qué secciones están abiertas
    // Inicializamos con el primer módulo abierto
    const [openSections, setOpenSections] = useState({ 'module-1': true })

    const toggleSection = (sectionKey) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }))
    }

    const renderIcon = (type) => {
        switch (type) {
            case 'video':
                return <PlayCircle className="h-3.5 w-3.5" />
            case 'pdf':
            case 'reading':
                return <FileText className="h-3.5 w-3.5 text-orange-500" />
            default:
                return <Circle className="h-3.5 w-3.5" />
        }
    }

    return (
        <div className="flex h-full flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-[#132391] px-6 py-4 text-white">
                <h3 className="font-semibold">Contenido del curso</h3>
                <button className="rounded-full p-1 hover:bg-white/10 transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto">
                {/* Modules */}
                {courseData.modules.map((module, index) => {
                    const isOpen = openSections[`module-${module.id}`]

                    return (
                        <div key={module.id} className="border-b border-gray-100 last:border-0">
                            <button
                                onClick={() => toggleSection(`module-${module.id}`)}
                                className={`flex w-full items-start justify-between bg-gray-50/50 px-6 py-4 text-left transition-colors hover:bg-gray-50 ${isOpen ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex gap-3">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-[#132391] text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#132391]">{module.title}</h4>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {module.completed_items}/{module.total_items} • {module.duration}
                                        </p>
                                    </div>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="h-5 w-5 text-[#132391]" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                            </button>

                            {/* Lessons */}
                            {isOpen && (
                                <div className="bg-white">
                                    {module.lessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className={`relative flex gap-4 px-6 py-4 transition-colors hover:bg-gray-50 ${lesson.current ? 'bg-gray-100/80' : ''
                                                }`}
                                        >
                                            {lesson.current && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2DAAAD]" />
                                            )}

                                            <div className="mt-1 shrink-0">
                                                {lesson.completed ? (
                                                    <CheckCircle2 className="h-5 w-5 text-[#2DAAAD]" />
                                                ) : (
                                                    <Circle className="h-5 w-5 text-gray-300" />
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-1">
                                                <p className={`text-sm font-medium ${lesson.current ? 'text-[#132391]' : 'text-gray-700'}`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    {renderIcon(lesson.type)}
                                                    <span>{lesson.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

                {/* Exam Section */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleSection('exam')}
                        className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 ${openSections['exam'] ? 'bg-blue-50/30' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center">
                                <FileCheck className="h-5 w-5 text-[#132391]" />
                            </div>
                            <span className="text-sm font-bold text-[#132391]">{courseData.exam.title}</span>
                        </div>
                        {openSections['exam'] ? (
                            <ChevronUp className="h-5 w-5 text-[#132391]" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-[#132391]" />
                        )}
                    </button>

                    {openSections['exam'] && (
                        <div className="bg-gray-50/30 px-6 py-6 space-y-6">
                            <ul className="space-y-4 text-sm text-[#132391]/80">
                                {courseData.exam.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#132391]" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#132391] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0B1B86]">
                                <span>Realizar el examen</span>
                                <ChevronDown className="h-4 w-4 -rotate-90" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div>
                    <button
                        onClick={() => toggleSection('results')}
                        className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 ${openSections['results'] ? 'bg-blue-50/30' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center">
                                <Trophy className="h-5 w-5 text-[#132391]" />
                            </div>
                            <span className="text-sm font-bold text-[#132391]">{courseData.results.title}</span>
                        </div>
                        {openSections['results'] ? (
                            <ChevronUp className="h-5 w-5 text-[#132391]" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-[#132391]" />
                        )}
                    </button>

                    {openSections['results'] && (
                        <div className="bg-gray-50/30 px-6 py-6 space-y-6">
                            <p className="text-xs text-[#132391]/60">
                                Fecha del último examen: {courseData.results.last_exam_date}
                            </p>

                            <div className="space-y-3 text-sm">
                                <div className="flex gap-1">
                                    <span className="font-bold text-[#132391]">Intentos:</span>
                                    <span className="text-[#132391]">{courseData.results.attempts}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-bold text-[#132391]">Estado:</span>
                                    <span className="text-[#132391]">{courseData.results.status}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-bold text-[#132391]">Resultado:</span>
                                    <span className="text-[#132391]">{courseData.results.score_text}</span>
                                </div>
                            </div>

                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#132391] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0B1B86]">
                                <span>Ver resultados</span>
                                <ChevronDown className="h-4 w-4 -rotate-90" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseSidebar
