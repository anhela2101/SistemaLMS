import React, { useState } from 'react'
import { Eye, EyeOff, CircleArrowOutUpRight, Loader2 } from 'lucide-react'
import loginImage from '../assets/img/login.jpg'
import logoBlanco from '../assets/img/LogoBlanco.png'
import Input from '../components/generals/Input'
import Button from '../components/generals/Button'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    setAuthError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message || 'No pudimos iniciar sesion. Revisa tus datos.')
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    navigate('/home')
  }

  const handleGoogleLogin = async () => {
    setAuthError('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    })

    if (error) {
      setAuthError(error.message || 'No pudimos iniciar sesion con Google.')
    }
  }

  return (
    <div className="flex min-h-screen ">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={loginImage}
          alt="Medicina Critica"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-indigo-700/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center">
              <img
                src={logoBlanco}
                alt="Logo Medicina Critica"
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-right mb-8">
            <span className="text-gray-600">No tienes una cuenta? </span>
            <a href="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Registrate
            </a>
          </div>

          <h2 className="text-3xl font-bold text-indigo-900 mb-8">Iniciar sesion</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {authError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {authError}
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              containerClassName="mb-4"
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-center">
              <span className="text-gray-600 text-sm">Olvidaste tu contrasena? </span>
              <a href="/reset-password" className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">
                Haz click aqui
              </a>
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
                  Iniciando sesion...
                </>
              ) : (
                <>
                  Iniciar sesion
                  <CircleArrowOutUpRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 mb-6">
            <p className="text-center text-gray-600 text-sm">Ingresar con</p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
