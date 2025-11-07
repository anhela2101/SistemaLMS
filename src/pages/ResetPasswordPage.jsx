import React, { useState } from 'react'
import { ArrowRight, CircleArrowOutUpRight, Info } from 'lucide-react'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (value && !emailRegex.test(value)) {
      setEmailError('Por favor, ingresa un correo electrónico válido')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar email antes de enviar
    if (emailError || !email) {
      setShowAlert(true)
      setAlertMessage('Por favor, ingresa un correo electrónico válido')
      return
    }
    
    // Aquí iría la lógica para enviar el email de recuperación
    console.log('Enviar link de recuperación a:', email)
    
    // Mostrar alerta de ejemplo (simular email no encontrado)
    setShowAlert(true)
    setAlertMessage('Correo electrónico no encontrado')
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

      {/* Lado derecho - Formulario */}
      <div className="flex-1 flex  justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Enlace de inicio de sesión */}
          <div className="text-right mb-8">
            <span className="text-gray-600">¿Recuerdas tu contraseña? </span>
            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Iniciar sesión
            </a>
          </div>

          {/* Alerta de error */}
          {showAlert && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-800">{alertMessage}</p>
            </div>
          )}

          {/* Título */}
          <h2 className="text-3xl font-bold text-indigo-900 mt-32 mb-4">Recuperar contraseña</h2>
          
          {/* Subtítulo */}
          <p className="text-gray-600 mb-8">
            Ingresa tu correo y te enviaremos un link para restablecer tu contraseña.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de correo electrónico */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              required
              containerClassName="mb-6"
            />

            {/* Botón de enviar */}
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              Enviar link
              <CircleArrowOutUpRight className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage