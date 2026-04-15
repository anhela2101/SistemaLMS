import React, { useState } from 'react'
import { Eye, EyeOff, CircleArrowOutUpRight, Loader2 } from 'lucide-react'
import ReactFlagsSelect from 'react-flags-select'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'
import { supabase } from '../lib/supabaseClient'

const PHONE_PREFIX_BY_COUNTRY = {
  PE: '+51',
  US: '+1',
  MX: '+52',
  AR: '+54',
  CL: '+56',
  CO: '+57',
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    document: '',
    phoneCode: 'PE',
    phone: '',
    email: '',
    password: '',
    acceptTerms: false
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDocumentChange = (e) => {
    const value = e.target.value
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

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (value && !emailRegex.test(value)) {
      setEmailError('Por favor, ingresa un correo electronico valido')
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
    if (value === '' || /^[0-9]+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        phone: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    const fullName = formData.fullName.trim()
    const document = formData.document.trim()
    const phone = formData.phone.trim()
    const email = formData.email.trim().toLowerCase()
    const password = formData.password
    const phonePrefix = PHONE_PREFIX_BY_COUNTRY[formData.phoneCode] ?? ''
    const phoneInternational = `${phonePrefix}${phone}`

    if (!fullName || !document || !phone || !email || !password) {
      setAuthError('Completa todos los datos antes de registrarte.')
      return
    }

    if (!formData.acceptTerms) {
      setAuthError('Debes aceptar los terminos y condiciones para registrarte.')
      return
    }

    if (emailError) {
      setAuthError('Por favor, corrige los errores en el formulario')
      return
    }

    if (password.length < 6) {
      setAuthError('La contrasena debe tener al menos 6 caracteres.')
      return
    }

    setIsLoading(true)
    setAuthError('')
    setSuccessMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          document,
          phone_code: formData.phoneCode,
          phone,
          phone_prefix: phonePrefix,
          phone_international: phoneInternational,
          accepted_terms: formData.acceptTerms,
        },
      },
    })

    if (error) {
      setAuthError(error.message || 'No pudimos crear tu cuenta.')
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    if (data.session) {
      navigate('/home')
      return
    }

    setSuccessMessage('Cuenta creada. Revisa tu correo para confirmar el registro.')
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={loginImage}
          alt="Medicina Critica"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-indigo-700/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="flex flex-col items-center gap-4">
            <img
              src={logoBlanco}
              alt="Logo Medicina Critica"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-right mb-8">
            <span className="text-gray-600">Ya tienes una cuenta? </span>
            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Iniciar sesion
            </a>
          </div>

          <h2 className="text-3xl font-bold text-indigo-900 mb-8">Registrarse</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {authError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {authError}
              </div>
            )}

            {successMessage && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <Input
              id="fullName"
              name="fullName"
              type="text"
              label="Nombre y Apellido"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              required
              containerClassName="mb-4"
            />

            <Input
              id="document"
              name="document"
              type="text"
              label="DNI / CE / PASAPORTE"
              value={formData.document}
              onChange={handleDocumentChange}
              disabled={isLoading}
              pattern="[0-9]*"
              inputMode="numeric"
              required
              containerClassName="mb-4"
            />

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Numero de telefono
              </label>
              <div className="flex gap-2">
                <div className="w-32">
                  <ReactFlagsSelect
                    selected={formData.phoneCode}
                    onSelect={handleCountryChange}
                    countries={["PE", "US", "MX", "AR", "CL", "CO"]}
                    customLabels={PHONE_PREFIX_BY_COUNTRY}
                    placeholder="Pais"
                    className="country-select"
                    selectButtonClassName="w-full px-3 py-2 rounded-md border border-[#132391] bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#132391] focus:border-[#132391] transition-colors duration-200"
                    selectFlagClassName="mr-2"
                    selectTriangleClassName="text-[#132391]"
                    searchInputClassName="px-3 py-2 border border-[#132391] rounded-md focus:outline-none focus:ring-2 focus:ring-[#132391] focus:border-[#132391]"
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={isLoading}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                  className="flex-1 px-3 py-2 rounded-md border border-[#132391] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#132391] focus:border-[#132391] transition-colors duration-200"
                />
              </div>
            </div>

            <Input
              id="email"
              name="email"
              type="email"
              label="Correo electronico"
              value={formData.email}
              onChange={handleEmailChange}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              required
              containerClassName="mb-4"
            />

            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Contrasena"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
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

            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                Acepto los{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Terminos y Condiciones
                </a>
                {' '}y la{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Politica de Privacidad
                </a>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  Registrarse
                  <CircleArrowOutUpRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
