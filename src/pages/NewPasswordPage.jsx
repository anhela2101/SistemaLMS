import React, { useState } from 'react'
import { Eye, EyeOff, CircleArrowOutUpRight } from 'lucide-react'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'

const NewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Validar en tiempo real
    if (name === 'password') {
      if (value.length < 8) {
        setErrors(prev => ({
          ...prev,
          password: 'La contraseña debe tener al menos 8 caracteres'
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          password: ''
        }))
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Las contraseñas no coinciden'
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones finales
    if (formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    if (errors.password || errors.confirmPassword) {
      alert('Por favor, corrige los errores en el formulario')
      return
    }
    
    // Aquí iría la lógica para restablecer la contraseña
    console.log('Restablecer contraseña:', formData)
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
      <div className="flex-1 flex   justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md mt-20">
          {/* Título */}
          <h2 className="text-3xl font-bold text-indigo-900 mb-8">Nueva contraseña</h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de contraseña */}
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
              containerClassName="mb-4"
            />

            {/* Campo de repetir contraseña */}
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Repetir contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
              containerClassName="mb-6"
            />

            {/* Botón de restablecer */}
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              Reestablecer
              <CircleArrowOutUpRight className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPasswordPage