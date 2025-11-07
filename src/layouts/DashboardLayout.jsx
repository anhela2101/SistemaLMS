import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
  const title = pathname.startsWith('/courses/')
    ? 'Descripción del curso'
    : pageTitles[pathname] ?? 'Panel'

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar title={title} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout