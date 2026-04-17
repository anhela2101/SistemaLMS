import React from 'react'
import { MoveUpRight } from 'lucide-react'
import Button from '../generals/Button'

const FreeMethod = ({ ctaLabel, disabled = false, loading = false, onStart }) => {
  return (
    <div className="mt-8 space-y-4">
      <div
        className="rounded-lg border-2 px-6 py-10 text-center"
        style={{
          borderColor: 'rgba(45, 169, 172, 1)',
          background: 'radial-gradient(circle, rgba(28, 101, 166, 0.12) 0%, rgba(232, 239, 252, 1) 100%)',
        }}
      >
        <h3 className="mb-3 text-2xl font-bold text-[#02A6A4]">Gratuito</h3>
        <p className="mx-auto max-w-xs text-sm leading-relaxed" style={{ color: 'rgba(149, 149, 154, 1)' }}>
          Activa el acceso desde tu cuenta y empieza con el contenido publicado del curso.
        </p>
      </div>

      <Button
        variant="primary"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#132391] py-3 hover:bg-[#0B1B86]"
        onClick={onStart}
        disabled={disabled || loading}
      >
        <span>{loading ? 'Activando...' : ctaLabel}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white" style={{ border: '1px solid #ffffff' }}>
          <MoveUpRight className="w-4 h-4" strokeWidth={2.5} style={{ color: 'rgba(19, 35, 145, 1)' }} />
        </span>
      </Button>
    </div>
  )
}

export default FreeMethod
