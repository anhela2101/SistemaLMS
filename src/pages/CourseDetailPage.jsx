import React from 'react'
import { Play, Clock, Video, Users, FileCheck, Download, MonitorPlay, Award, ShieldCheck, Star, StarHalf } from 'lucide-react'
import Button from '../components/generals/Button'

const includedItems = [
  { label: 'Clases en video disponibles 24/7', icon: MonitorPlay },
  { label: 'Acceso al curso por 30 días', icon: Clock },
  { label: 'Material descargable', icon: Download },
  { label: 'Certificado digital inmediato', icon: Award },
  { label: 'Examen online', icon: FileCheck }
]

const endorsements = [
  'Centro de Entrenamiento Internacional Dr. Vigo RCP',
  'MEDCRI – Centro de Entrenamiento Internacional'
]

const CourseDetailPage = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-6">
        <div>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#132391] hover:text-[#0B1B86]">
            <span className="text-lg">↩</span>
            Descripción del curso
          </button>
        </div>

        <header className="space-y-3">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1B86] uppercase">REACT® – I</h1>
            <p className="text-lg text-[#132391]/80">Respuesta Efectiva en Atención Crítica y Traslados</p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-black">
            <div className="relative h-72 w-full">
              <video
                className="h-full w-full object-cover"
                controls
                poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=60"
              >
                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#132391]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 horas
            </span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              8 videos
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Básico
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              88 profesionales de la salud
            </span>
          </div>
        </header>

        <article className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-base text-gray-600">
            Este curso está diseñado para todos los profesionales de la salud que intervienen en la primera respuesta, sin importar su profesión,
            especialidad o nivel previo de experiencia.
          </p>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="text-base font-semibold text-[#0B1B86]">Instructor:</h3>
              <p>Dr. Yeison Benites Silva</p>
              <p>Médico Emergenciólogo – CEO Medicina Crítica</p>
              <p>Máster en Cuidados Críticos y Cardiovasculares</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#0B1B86]">Objetivos del Curso</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Brindar al personal de salud conocimientos y herramientas fundamentales para la atención crítica en el entorno prehospitalario.</li>
                <li>Fortalecer la toma de decisiones rápidas y seguras en situaciones de emergencia.</li>
                <li>Capacitar en principios de traslado asistido y manejo inicial de pacientes críticos.</li>
                <li>Promover la actuación coordinada y segura del equipo prehospitalario ante eventos agudos.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#0B1B86]">Lo que aprenderás</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Evaluación primaria y secundaria del paciente crítico.</li>
                <li>Manejo de la vía aérea y ventilación básica.</li>
                <li>Reanimación cardiopulmonar prehospitalaria.</li>
                <li>Principios de traslado seguro en ambulancia.</li>
                <li>Abordaje inicial de traumatismos y emergencias médicas.</li>
                <li>Rol del equipo de atención durante traslados.</li>
                <li>Comunicación efectiva y coordinación con el centro de referencia.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#0B1B86]">Virtudes del Curso</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Enfoque práctico y clínico adaptado a la realidad del trabajo prehospitalario.</li>
                <li>Instructores con experiencia real en campo crítico y emergencias.</li>
                <li>Médicos especialistas – Emergenciólogos, intensivistas.</li>
                <li>Contenido estructurado por niveles de complejidad (REACT I, II, III).</li>
                <li>Certificación respaldada por instituciones reconocidas.</li>
                <li>Preparación para escenarios reales de vida o muerte.</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#0B1B86]">Valor del curso</h3>
          <p className="mt-4 text-3xl font-extrabold text-[#0B1B86]">$ 0000,00</p>

          <div className="mt-4 space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <p>Métodos de pago</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="rounded-md bg-gray-100 px-2 py-1">Visa</span>
              <span className="rounded-md bg-gray-100 px-2 py-1">Mastercard</span>
              <span className="rounded-md bg-gray-100 px-2 py-1">American Express</span>
              <span className="rounded-md bg-gray-100 px-2 py-1">Plin</span>
              <span className="rounded-md bg-gray-100 px-2 py-1">Yape</span>
              <span className="rounded-md bg-gray-100 px-2 py-1">PagoEfectivo</span>
            </div>
          </div>

          <Button
            variant="primary"
            className="mt-6 w-full bg-[#132391] hover:bg-[#0B1B86]"
          >
            Quiero este curso
          </Button>

          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-[#0B1B86]">Incluye</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {includedItems.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#132391]" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-[#0B1B86]">Respaldo oficial de:</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {endorsements.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#132391]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#0B1B86]">Ellos ya se capacitaron</h4>
            <p className="text-xs text-gray-500">+ 6 000 alumnos certificados con éxito</p>

            <div className="mt-3 flex items-end gap-3">
              <div className="flex items-center gap-1 text-[#F5A623]">
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <StarHalf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#132391]">4.5</p>
                <p className="text-xs text-gray-500">106 reseñas</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-semibold uppercase text-gray-500">5</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-4/5 rounded-full bg-[#132391]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-semibold uppercase text-gray-500">4</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-3/5 rounded-full bg-[#132391]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-semibold uppercase text-gray-500">3</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-2/5 rounded-full bg-[#132391]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-semibold uppercase text-gray-500">2</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-1/5 rounded-full bg-[#132391]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-semibold uppercase text-gray-500">1</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[10%] rounded-full bg-[#132391]" />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#132391]/5 p-4 text-sm text-[#132391]">
              <p className="font-semibold">88% Recomendados</p>
              <p className="text-xs text-[#132391]/70">Basado en 106 reseñas verificadas.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CourseDetailPage

