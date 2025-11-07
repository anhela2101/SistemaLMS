import React, { useState } from 'react'
import { Eye, EyeOff, ArrowRight, CircleArrowOutUpRight } from 'lucide-react'
import ReactFlagsSelect from 'react-flags-select'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    document: '',
    phoneCode: 'PE',
    phone: '',
    email: '',
    password: '',
    acceptTerms: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDocumentChange = (e) => {
    const value = e.target.value
    // Solo permitir números
    if (value === '' || /^[0-9]+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        document: value
      }))
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      email: value
    }))
    
    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (value && !emailRegex.test(value)) {
      setEmailError('Por favor, ingresa un correo electrónico válido')
    } else {
      setEmailError('')
    }
  }

  const handleCountryChange = (countryCode) => {
    setFormData(prev => ({
      ...prev,
      phoneCode: countryCode
    }))
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Solo permitir números
    if (value === '' || /^[0-9]+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        phone: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar email antes de enviar
    if (emailError) {
      alert('Por favor, corrige los errores en el formulario')
      return
    }
    
    console.log('Register:', formData)
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
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Enlace de inicio de sesión */}
          <div className="text-right mb-8">
            <span className="text-gray-600">¿Ya tienes una cuenta? </span>
            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Iniciar sesión
            </a>
          </div>

          {/* Título */}
          <h2 className="text-3xl font-bold text-indigo-900 mb-8">Registrarse</h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo de nombre completo */}
            <Input
              id="fullName"
              name="fullName"
              type="text"
              label="Nombre y Apellido"
              value={formData.fullName}
              onChange={handleChange}
              required
              containerClassName="mb-4"
            />

            {/* Campo de documento */}
            <Input
              id="document"
              name="document"
              type="text"
              label="DNI / CE / PASAPORTE"
              value={formData.document}
              onChange={handleDocumentChange}
              pattern="[0-9]*"
              inputMode="numeric"
              required
              containerClassName="mb-4"
            />

            {/* Campo de teléfono con código de país */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Número de teléfono
              </label>
              <div className="flex gap-2">
                {/* Selector de código de país */}
                <div className="w-32">
                  <ReactFlagsSelect
                    selected={formData.phoneCode}
                    onSelect={handleCountryChange}
                    countries={["PE", "US", "MX", "AR", "CL", "CO"]}
                    customLabels={{
                      PE: "+51",
                      US: "+1",
                      MX: "+52",
                      AR: "+54",
                      CL: "+56",
                      CO: "+57"
                    }}
                    placeholder="País"
                    className="country-select"
                    selectButtonClassName="w-full px-3 py-2 rounded-md border border-[#132391] bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#132391] focus:border-[#132391] transition-colors duration-200"
                    selectFlagClassName="mr-2"
                    selectTriangleClassName="text-[#132391]"
                    searchInputClassName="px-3 py-2 border border-[#132391] rounded-md focus:outline-none focus:ring-2 focus:ring-[#132391] focus:border-[#132391]"
                  />
                </div>
                
                {/* Input de teléfono */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                  className="flex-1 px-3 py-2 rounded-md border border-[#132391] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#132391] focus:border-[#132391] transition-colors duration-200"
                />
              </div>
            </div>

            {/* Campo de correo electrónico */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Correo electrónico"
              value={formData.email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              required
              containerClassName="mb-4"
            />

            {/* Campo de contraseña */}
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
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

            {/* Checkbox de términos y condiciones */}
            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                Acepto los{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Términos y Condiciones
                </a>
                {' '}y la{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Política de Privacidad
                </a>
              </label>
            </div>

            {/* Botón de registro */}
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              Registrarse
               <CircleArrowOutUpRight className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage