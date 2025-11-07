import React from 'react'
import { Bell, ChevronDown } from 'lucide-react'

const Navbar = ({ title = 'Explorar cursos' }) => {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-5 bg-white border-b border-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1B86]">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#132391]/20 text-[#132391] hover:bg-[#132391]/5 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notificaciones</span>
          <span className="absolute top-2 right-2 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500"></span>
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-[#132391]/20 px-3 py-2 text-sm font-semibold text-[#132391] hover:bg-[#132391]/5 transition-colors"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#132391] text-white font-medium">
            M
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold">María Pérez</p>
            <p className="text-xs text-[#132391]/70">Coordinadora</p>
          </div>
          <ChevronDown className="w-4 h-4" />
          <span className="sr-only">Abrir menú de usuario</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar

