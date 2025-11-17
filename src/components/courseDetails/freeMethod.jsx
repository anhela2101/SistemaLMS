import React from 'react'
import { MoveUpRight } from 'lucide-react'
import Button from '../generals/Button'

const FreeMethod = () => {
  return (
    <div className="space-y-4 mt-8">
      <div
        className="rounded-lg border-2 px-6 py-10 text-center"
        style={{
          borderColor: 'rgba(45, 169, 172, 1)',
          background: 'radial-gradient(circle, rgba(28, 101, 166, 0.12) 0%, rgba(232, 239, 252, 1) 100%)'
        }}
      >
        <h3 className="text-2xl font-bold text-[#02A6A4] mb-3">Gratuito</h3>
        <p
          className="text-sm leading-relaxed max-w-xs mx-auto"
          style={{ color: 'rgba(149, 149, 154, 1)' }}
        >
          Empieza gratis hoy y vive la experiencia de capacitarte con nosotros.
        </p>
      </div>

      <Button
        variant="primary"
        className="w-full bg-[#132391] hover:bg-[#0B1B86] flex items-center justify-center gap-2 rounded-2xl py-3"
      >
        <span>Comenzar gratis</span>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white"
          style={{ border: '1px solid #ffffff' }}
        >
          <MoveUpRight className="w-4 h-4" strokeWidth={2.5} style={{ color: 'rgba(19, 35, 145, 1)' }} />
        </span>
      </Button>
    </div>
  )
}

export default FreeMethod