import React, { useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import masterLogo from '../../assets/img/MetodoPagos/master.png'
import visaLogo from '../../assets/img/MetodoPagos/visa.png'
import pagoEfectivoLogo from '../../assets/img/MetodoPagos/efectivo.png'
import amexLogo from '../../assets/img/MetodoPagos/AmericanExpress.png'
import dinersLogo from '../../assets/img/MetodoPagos/DinersClub.png'
import yapeLogo from '../../assets/img/MetodoPagos/yape.png'
import Button from '../generals/Button'
import { FLOW_PAYMENT_METHODS } from '../../lib/lmsData'

const PaymentMethod = ({
  priceLabel,
  ctaLabel,
  disabled = false,
  loading = false,
  onCheckout,
  currentStatusLabel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(9)

  const handleClick = () => {
    if (disabled || loading || !onCheckout) return
    onCheckout(selectedMethod)
  }

  return (
    <div>
      <p
        className="mt-4 inline-block w-full rounded-lg px-4 py-2 text-center text-3xl font-extrabold"
        style={{
          background: 'radial-gradient(circle, rgba(62, 151, 230, 0.22) 0%, rgba(193, 210, 226, 1) 100%)',
          color: 'rgba(19, 35, 145, 1)',
        }}
      >
        {priceLabel}
      </p>

      {currentStatusLabel ? (
        <p className="mt-3 text-center text-sm font-semibold text-[#132391]">{currentStatusLabel}</p>
      ) : null}

      <div className="mt-8 space-y-2 text-md font-semibold tracking-wide text-gray-500">
        <p>Metodos de pago</p>
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex flex-wrap justify-center gap-6">
            <img src={masterLogo} alt="Mastercard" className="h-6 object-contain" />
            <img src={visaLogo} alt="Visa" className="h-6 object-contain" />
            <img src={pagoEfectivoLogo} alt="Pago Efectivo" className="h-8 object-contain" />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <img src={amexLogo} alt="American Express" className="h-10 object-contain" />
            <img src={dinersLogo} alt="Diners Club" className="h-10 object-contain" />
            <img src={yapeLogo} alt="Yape" className="h-10 object-contain" />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <p className="text-sm font-semibold text-[#132391]">Checkout</p>
        <div className="grid gap-2">
          {FLOW_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                selectedMethod === method.id
                  ? 'border-[#132391] bg-[#132391]/5 text-[#132391]'
                  : 'border-[#132391]/15 bg-white text-gray-600 hover:border-[#132391]/40'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <p className="text-sm font-bold">{method.label}</p>
              <p className="text-xs">{method.description}</p>
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        className="mt-10 flex w-full items-center justify-center gap-2 bg-[#132391] hover:bg-[#0B1B86]"
        onClick={handleClick}
        disabled={disabled || loading}
      >
        <span>{loading ? 'Redirigiendo...' : ctaLabel}</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white" style={{ border: '1px solid #ffffff' }}>
          <MoveUpRight className="w-4 h-4" strokeWidth={2.5} style={{ color: 'rgba(19, 35, 145, 1)' }} />
        </span>
      </Button>
    </div>
  )
}

export default PaymentMethod
