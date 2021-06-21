import { camelizeKeys } from 'humps'

// A lightweight wrapper around the Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
async function fetchWrapper(url, options, config) {
  const { camelizeBody } = config
  const response = await fetch(url, options)
  const data = await response.json()

  if (!camelizeBody) return data
  return camelizeKeys(data)
}

class Api {
  constructor(globalConfig = {}) {
    this.config = globalConfig
  }

  call(url, options = {}, config = {}) {
    return fetchWrapper(url, options, { ...this.config, ...config })
  }
}

export default new Api()
