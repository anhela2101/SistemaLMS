const BREVO_TRANSACTIONAL_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'

const jsonResponse = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const isValidRecipient = (recipient) => {
  return Boolean(recipient?.email && typeof recipient.email === 'string')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return jsonResponse(res, 405, { error: 'Method not allowed' })
  }

  const apiKey = process.env.BREVO_API_KEY
  const internalSecret = process.env.INTERNAL_API_SECRET
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME || 'Medicina Critica'

  if (!apiKey || !internalSecret || !senderEmail) {
    return jsonResponse(res, 500, { error: 'Missing email server configuration' })
  }

  if (req.headers['x-app-secret'] !== internalSecret) {
    return jsonResponse(res, 401, { error: 'Unauthorized' })
  }

  const {
    to,
    subject,
    htmlContent,
    textContent,
    templateId,
    params,
    replyTo,
  } = req.body || {}

  if (!Array.isArray(to) || !to.length || !to.every(isValidRecipient)) {
    return jsonResponse(res, 400, { error: 'A valid recipient list is required' })
  }

  if (!templateId && (!subject || !htmlContent)) {
    return jsonResponse(res, 400, { error: 'Provide a templateId or subject + htmlContent' })
  }

  const emailPayload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to,
    params,
  }

  if (replyTo?.email) {
    emailPayload.replyTo = replyTo
  }

  if (templateId) {
    emailPayload.templateId = Number(templateId)
  } else {
    emailPayload.subject = subject
    emailPayload.htmlContent = htmlContent

    if (textContent) {
      emailPayload.textContent = textContent
    }
  }

  const brevoResponse = await fetch(BREVO_TRANSACTIONAL_EMAIL_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  })

  const data = await brevoResponse.json().catch(() => ({}))

  if (!brevoResponse.ok) {
    return jsonResponse(res, brevoResponse.status, {
      error: 'Brevo email request failed',
      details: data,
    })
  }

  return jsonResponse(res, 200, data)
}
