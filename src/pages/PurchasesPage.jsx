import React, { useEffect, useMemo, useState } from 'react'
import { FileText, Eye, Download } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { loadMyPurchases } from '../lib/lmsData'

const statusConfig = {
  paid: {
    label: 'Pago confirmado',
    className: 'border-green-200 bg-green-50 text-green-700',
  },
  pending: {
    label: 'Pago pendiente',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  failed: {
    label: 'Pago rechazado',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  error: {
    label: 'No se pudo verificar el pago',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
}

const PurchasesPage = () => {
  const location = useLocation()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const flowStatusNotice = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const paymentStatus = params.get('paymentStatus')
    if (!paymentStatus) return null
    return statusConfig[paymentStatus] || null
  }, [location.search])

  useEffect(() => {
    let isMounted = true

    const fetchPurchases = async () => {
      try {
        const data = await loadMyPurchases()
        if (isMounted) {
          setPurchases(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudieron cargar tus compras.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPurchases()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="text-sm text-gray-500">Cargando compras...</div>
  }

  return (
    <div className="space-y-4">
      {flowStatusNotice && (
        <div className={`rounded-lg border px-4 py-3 text-sm ${flowStatusNotice.className}`}>
          {flowStatusNotice.label}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {!purchases.length ? (
        <div className="text-sm text-gray-500">Aun no tienes compras registradas.</div>
      ) : (
        purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex items-center justify-between rounded-2xl border border-[#132391]/15 bg-white px-6 py-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF]">
                <FileText className="w-5 h-5 text-[#132391]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#132391]">{purchase.title}</p>
                <p className="text-xs text-gray-500">
                  Operacion {purchase.voucher}
                  <span className="mx-2">•</span>
                  {purchase.date}
                  <span className="mx-2">•</span>
                  {purchase.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[#132391]">
              <p className="text-sm font-bold">{purchase.amount}</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#F0F4FF] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ver comprobante"
                  onClick={() => {
                    const targetUrl = purchase.checkoutUrl || purchase.payload?.receiptUrl || null
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  disabled={!purchase.checkoutUrl && !purchase.payload?.receiptUrl}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <span className="h-6 w-px bg-[#132391]/20" />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#F0F4FF] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Descargar comprobante"
                  onClick={() => {
                    const targetUrl = purchase.checkoutUrl || purchase.payload?.receiptUrl || null
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  disabled={!purchase.checkoutUrl && !purchase.payload?.receiptUrl}
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default PurchasesPage
