const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

export const builder = (data, message, code) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== null) {
    responseBody.code = code
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}
