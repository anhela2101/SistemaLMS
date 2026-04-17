import React, { useEffect, useState } from 'react'
import { Award, Eye, Download } from 'lucide-react'
import { loadMyCertificates } from '../lib/lmsData'

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchCertificates = async () => {
      try {
        const data = await loadMyCertificates()
        if (isMounted) {
          setCertificates(data)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'No se pudieron cargar tus certificados.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCertificates()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="text-sm text-gray-500">Cargando certificados...</div>
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMessage}
      </div>
    )
  }

  if (!certificates.length) {
    return <div className="text-sm text-gray-500">Aun no tienes certificados emitidos.</div>
  }

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
                  Certificado N. {certificate.number}
                  <span className="mx-2">•</span>
                  {certificate.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#132391]">
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#F0F4FF] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Ver certificado"
                onClick={() => window.open(certificate.pdfUrl, '_blank', 'noopener,noreferrer')}
                disabled={!certificate.pdfUrl}
              >
                <Eye className="w-5 h-5" />
              </button>
              <span className="h-6 w-px bg-[#132391]/20" />
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#F0F4FF] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Descargar certificado"
                onClick={() => window.open(certificate.pdfUrl, '_blank', 'noopener,noreferrer')}
                disabled={!certificate.pdfUrl}
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
