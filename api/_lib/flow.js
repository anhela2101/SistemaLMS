import { createHmac } from 'node:crypto'

const DEFAULT_FLOW_BASE_URL = 'https://www.flow.cl/api'

export const getFlowConfig = () => {
  const apiKey = process.env.FLOW_API_KEY
  const secretKey = process.env.FLOW_SECRET_KEY
  const baseUrl = (process.env.FLOW_BASE_URL || DEFAULT_FLOW_BASE_URL).replace(/\/$/, '')

  if (!apiKey || !secretKey) {
    throw new Error('Missing Flow configuration')
  }

  return { apiKey, secretKey, baseUrl }
}

export const signFlowParams = (params, secretKey) => {
  const keys = Object.keys(params).sort()
  const stringToSign = keys.reduce((accumulator, key) => {
    const value = params[key]

    if (value === undefined || value === null || value === '') {
      return accumulator
    }

    return accumulator + key + value
  }, '')

  return createHmac('sha256', secretKey).update(stringToSign).digest('hex')
}

export const flowPost = async (endpoint, params) => {
  const { secretKey, baseUrl } = getFlowConfig()
  const signature = signFlowParams(params, secretKey)
  const payload = new URLSearchParams({
    ...params,
    s: signature,
  })

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: payload.toString(),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || data.error || `Flow request failed with status ${response.status}`
    const error = new Error(message)
    error.details = data
    error.status = response.status
    throw error
  }

  return data
}

export const flowGet = async (endpoint, params) => {
  const { secretKey, baseUrl } = getFlowConfig()
  const signature = signFlowParams(params, secretKey)
  const query = new URLSearchParams({
    ...params,
    s: signature,
  })

  const response = await fetch(`${baseUrl}${endpoint}?${query.toString()}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || data.error || `Flow request failed with status ${response.status}`
    const error = new Error(message)
    error.details = data
    error.status = response.status
    throw error
  }

  return data
}

export const getFlowPaymentStatus = async (token) => {
  const { apiKey } = getFlowConfig()

  return flowGet('/payment/getStatus', {
    apiKey,
    token,
  })
}
