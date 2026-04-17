import { getFlowPaymentStatus } from '../../_lib/flow.js'
import { parseFormUrlEncodedBody } from '../../_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET, POST')
    return res.end('Method not allowed')
  }

  const body = req.method === 'POST' ? parseFormUrlEncodedBody(req.body) : req.query
  const token = body.token || req.query.token

  if (!token) {
    res.statusCode = 302
    res.setHeader('Location', '/my-purchases?paymentStatus=error')
    return res.end()
  }

  try {
    const flowStatus = await getFlowPaymentStatus(token)
    const mappedStatus =
      Number(flowStatus.status) === 2
        ? 'paid'
        : Number(flowStatus.status) === 1
          ? 'pending'
          : 'failed'

    const location = `/my-purchases?paymentStatus=${mappedStatus}&flowOrder=${encodeURIComponent(flowStatus.flowOrder || '')}`
    res.statusCode = 302
    res.setHeader('Location', location)
    return res.end()
  } catch {
    res.statusCode = 302
    res.setHeader('Location', '/my-purchases?paymentStatus=error')
    return res.end()
  }
}
