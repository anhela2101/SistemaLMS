import React from 'react'
import { FileText, Eye, Download } from 'lucide-react'

const purchases = [
  {
    id: 1,
    title: 'REACT® II',
    voucher: 'XX-XXXX-XXXX',
    date: '28 Agosto 2025',
    amount: '$ 00,00'
  },
  {
    id: 2,
    title: 'REACT® III',
    voucher: 'XX-XXXX-XXXX',
    date: '28 Agosto 2025',
    amount: '$ 00,00'
  }
]

const PurchasesPage = () => {
  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
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
                Comprobante N° {purchase.voucher}
                <span className="mx-2">•</span>
                {purchase.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[#132391]">
            <p className="text-sm font-bold">{purchase.amount}</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 hover:bg-[#F0F4FF] transition-colors"
                aria-label="Ver comprobante"
              >
                <Eye className="w-5 h-5" />
              </button>
              <span className="h-6 w-px bg-[#132391]/20" />
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 hover:bg-[#F0F4FF] transition-colors"
                aria-label="Descargar comprobante"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PurchasesPage