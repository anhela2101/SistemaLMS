import React from 'react'
import { Award, Eye, Download } from 'lucide-react'

const certificates = [
  {
    id: 1,
    title: 'REACT® I',
    number: 'XX-XXXX-XXXX',
    date: '28 Agosto 2025'
  },
  {
    id: 2,
    title: 'REACT® II',
    number: 'XX-XXXX-XXXX',
    date: '28 Agosto 2025'
  }
]

const CertificatesPage = () => {
  return (
    <div className="space-y-6">

      <div className="space-y-4">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="flex items-center justify-between rounded-2xl border border-[#132391]/15 bg-white px-6 py-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF]">
                <Award className="w-5 h-5 text-[#132391]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#132391]">{certificate.title}</p>
                <p className="text-xs text-gray-500">
                  Número de certificado N° {certificate.number}
                  <span className="mx-2">•</span>
                  {certificate.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#132391]">
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 hover:bg-[#F0F4FF] transition-colors"
                aria-label="Ver certificado"
              >
                <Eye className="w-5 h-5" />
              </button>
              <span className="h-6 w-px bg-[#132391]/20" />
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 hover:bg-[#F0F4FF] transition-colors"
                aria-label="Descargar certificado"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CertificatesPage