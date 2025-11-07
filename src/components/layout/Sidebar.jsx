import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ShoppingBag,
  HelpCircle
} from 'lucide-react'
import logoBlanco from '../../assets/img/LogoBlanco.png'

const menuItems = [
  {
    label: 'Inicio',
    to: '/home',
    icon: LayoutDashboard
  },
  {
    label: 'Mis cursos',
    to: '/my-courses',
    icon: BookOpen
  },
  {
    label: 'Mis certificados',
    to: '/my-certificates',
    icon: GraduationCap
  },
  {
    label: 'Mis compras',
    to: '/my-purchases',
    icon: ShoppingBag
  }
]

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 h-screen w-72 bg-gradient-to-b from-[#0B1B86] to-[#1CB0B5] text-white overflow-hidden">
      <div className="flex items-center gap-3 px-8 pt-10 pb-8 border-b border-white/10">
        <img src={logoBlanco} alt="Medicina Crítica" className="w-14 h-14 object-contain" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Medicina Crítica</p>
          <p className="text-xs text-white/80">Emergencias Médicas</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-auto">
        {menuItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                ? 'bg-white text-[#0B1B86] shadow-lg shadow-black/10'
                : 'text-white/80 hover:bg-white/10 hover:text-white'}
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-semibold">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 pb-10">
        <NavLink
          to="/help"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
            ${isActive
              ? 'bg-white text-[#0B1B86] shadow-lg shadow-black/10'
              : 'bg-white/10 text-white hover:bg-white/20'}
          `}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">Ayuda</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar

