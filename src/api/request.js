export const apiUrl = process.env.REACT_APP_API_URL

export const defaultHeaders = {
  'Content-Type': 'application/json',
}

async function request(endpoint, { body, ...customConfig } = {}) {
  const config = {
    method: customConfig.method || 'GET',
    headers: defaultHeaders,
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  const response = await fetch(`${apiUrl}${endpoint}`, config)
  if (!response.ok) {
    throw new Error(await handleError(response))
  }

  return response.json()
}

export async function handleError(response) {
  // TO-DO: if it's 403, then logout

  const errorMessage = await response.text()
  const parsedMessage = JSON.parse(errorMessage)

  return parsedMessage.message
}

export default request
