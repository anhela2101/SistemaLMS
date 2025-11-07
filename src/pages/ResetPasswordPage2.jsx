import React from 'react'
import { CircleArrowOutUpRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Button from '../components/generals/Button'

const ResetPasswordPage2 = () => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Lado izquierdo - Imagen de fondo con logo */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          src={loginImage} 
          alt="Medicina Crítica" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay azul transparente */}
        <div className="absolute inset-0 bg-indigo-700/60"></div>
        
        {/* Logo y texto */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="flex flex-col items-center gap-4">
            <img 
              src={logoBlanco} 
              alt="Logo Medicina Crítica" 
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Lado derecho - Mensaje de confirmación */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md text-center">
          {/* Ícono de éxito */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            Contraseña restablecida
          </h2>
          
          {/* Subtítulo */}
          <p className="text-gray-600 mb-8">
            Tu contraseña se actualizó correctamente.<br />
            Ahora puedes iniciar sesión.
          </p>

          {/* Botón de iniciar sesión */}
          <Button
            type="button"
            variant="primary"
            onClick={handleGoToLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            Iniciar sesión
            <CircleArrowOutUpRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage2