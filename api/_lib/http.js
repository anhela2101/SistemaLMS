export const jsonResponse = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export const getRequestOrigin = (req) => {
  const explicitBaseUrl = process.env.APP_BASE_URL

  if (explicitBaseUrl) {
    return explicitBaseUrl.replace(/\/$/, '')
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host
  const protocol = req.headers['x-forwarded-proto'] || 'https'

  return `${protocol}://${host}`
}

export const parseFormUrlEncodedBody = (body) => {
  if (!body) return {}

  if (typeof body === 'object') {
    return body
  }

  const params = new URLSearchParams(body)
  return Object.fromEntries(params.entries())
}
