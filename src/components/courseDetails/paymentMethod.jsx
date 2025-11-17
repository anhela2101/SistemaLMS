import React from 'react'
import masterLogo from '../../assets/img/MetodoPagos/master.png'
import visaLogo from '../../assets/img/MetodoPagos/visa.png'
import pagoEfectivoLogo from '../../assets/img/MetodoPagos/efectivo.png'
import amexLogo from '../../assets/img/MetodoPagos/AmericanExpress.png'
import dinersLogo from '../../assets/img/MetodoPagos/DinersClub.png'
import yapeLogo from '../../assets/img/MetodoPagos/yape.png'
import { MoveUpRight } from 'lucide-react'
import Button from '../generals/Button'

const PaymentMethod = () => {
    return (
        <div>
            <p
                className="mt-4 w-full text-center inline-block rounded-lg px-4 py-2 text-3xl font-extrabold"
                style={{
                    background:
                        'radial-gradient(circle, rgba(62, 151, 230, 0.22) 0%, rgba(193, 210, 226, 1) 100%)',
                    color: 'rgba(19, 35, 145, 1)'
                }}
            >
                $ 0000,00
            </p>
            <div className="mt-8 space-y-2 text-md font-semibold  tracking-wide text-gray-500">
                <p>Métodos de pago</p>
                <div className="flex flex-col gap-3 mt-8">
                    <div className="flex flex-wrap justify-center gap-6">
                        <img src={masterLogo} alt="Mastercard" className="h-6 object-contain" />
                        <img src={visaLogo} alt="Visa" className="h-6 object-contain" />
                        <img src={pagoEfectivoLogo} alt="PagoEfectivo" className="h-8 object-contain" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <img src={amexLogo} alt="American Express" className="h-15 object-contain" />
                        <img src={dinersLogo} alt="Diners Club" className="h-15 object-contain" />
                        <img src={yapeLogo} alt="Yape" className="h-15 object-contain" />
                    </div>
                </div>
            </div>
            <Button
                variant="primary"
                className="mt-10 w-full bg-[#132391] hover:bg-[#0B1B86] flex items-center justify-center gap-2"
            >
                <span>Quiero este curso</span>
                <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                    style={{ border: '1px solid #ffffff' }}
                >
                    <MoveUpRight className="w-4 h-4" strokeWidth={2.5} style={{ color: 'rgba(19, 35, 145, 1)' }} />
                </span>
            </Button>

        </div>
    )
}

export default PaymentMethod