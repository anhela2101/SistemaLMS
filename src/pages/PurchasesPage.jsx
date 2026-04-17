import React, { useEffect, useMemo, useState } from 'react'
import { FileText, Eye, Download, X } from 'lucide-react'
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
  const [selectedPurchase, setSelectedPurchase] = useState(null)

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

  const getReceiptUrl = (purchase) => {
    if (!purchase) return null
    return purchase.payload?.receiptUrl || purchase.payload?.paymentData?.receiptUrl || null
  }

  const canOpenCheckout = (purchase) => purchase?.status === 'Pendiente' && Boolean(purchase.checkoutUrl)

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
                  aria-label="Ver detalle de compra"
                  onClick={() => setSelectedPurchase(purchase)}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <span className="h-6 w-px bg-[#132391]/20" />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#F0F4FF] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Descargar comprobante"
                  onClick={() => {
                    const targetUrl = getReceiptUrl(purchase)
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  disabled={!getReceiptUrl(purchase)}
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedPurchase ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-extrabold text-[#132391]">Detalle de compra</h2>
                <p className="text-xs font-semibold text-gray-400">{selectedPurchase.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPurchase(null)}
                className="text-gray-400 transition-colors hover:text-gray-700"
                aria-label="Cerrar detalle"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Operacion</p>
                  <p className="mt-1 font-bold text-gray-800">{selectedPurchase.voucher}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Estado</p>
                  <p className="mt-1 font-bold text-gray-800">{selectedPurchase.status}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Fecha</p>
                  <p className="mt-1 font-bold text-gray-800">{selectedPurchase.date}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Monto</p>
                  <p className="mt-1 font-bold text-gray-800">{selectedPurchase.amount}</p>
                </div>
              </div>

              {selectedPurchase.payload?.paymentData ? (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-gray-400">Pago confirmado</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Medio</p>
                      <p className="font-bold text-gray-800">{selectedPurchase.payload.paymentData.media || 'No informado'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Fecha Flow</p>
                      <p className="font-bold text-gray-800">{selectedPurchase.payload.paymentData.date || 'No informada'}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              {selectedPurchase.payload?.pendingInfo ? (
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-amber-700">Pago pendiente</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-amber-700/70">Medio</p>
                      <p className="font-bold text-amber-900">{selectedPurchase.payload.pendingInfo.media || 'No informado'}</p>
                    </div>
                    <div>
                      <p className="text-amber-700/70">Fecha limite</p>
                      <p className="font-bold text-amber-900">{selectedPurchase.payload.pendingInfo.date || 'No informada'}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-5">
              {canOpenCheckout(selectedPurchase) ? (
                <button
                  type="button"
                  onClick={() => window.open(selectedPurchase.checkoutUrl, '_blank', 'noopener,noreferrer')}
                  className="rounded-lg bg-[#132391] px-4 py-2 text-sm font-bold text-white hover:bg-[#0B1B86]"
                >
                  Continuar pago
                </button>
              ) : null}

              {getReceiptUrl(selectedPurchase) ? (
                <button
                  type="button"
                  onClick={() => window.open(getReceiptUrl(selectedPurchase), '_blank', 'noopener,noreferrer')}
                  className="rounded-lg border border-[#132391]/20 px-4 py-2 text-sm font-bold text-[#132391] hover:bg-[#F0F4FF]"
                >
                  Descargar comprobante
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setSelectedPurchase(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PurchasesPage
