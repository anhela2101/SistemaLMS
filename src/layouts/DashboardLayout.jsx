import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

const pageTitles = {
  '/home': 'Explorar cursos',
  '/my-courses': 'Mis cursos',
  '/my-certificates': 'Mis certificados',
  '/my-purchases': 'Mis compras'
}

const DashboardLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const title = pathname.startsWith('/courses/')
    ? (
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full border border-[#132391]/20 p-1 text-[#132391] hover:bg-[#132391]/5 transition-colors"
            aria-label="Volver a la página anterior"
          >
            <MoveLeft className="w-5 h-5" />
          </button>
          <span>Descripción del curso</span>
        </span>
      )
    : pageTitles[pathname] ?? 'Panel'

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar title={title} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout