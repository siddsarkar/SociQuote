/**
 * Global network request handler
 * @param {RequestInfo} url url to fetch
 * @param {RequestInit=} options fetch options
 * @returns json response
 */
const processFetchRequest = async (url, options) => {
  const ts = Date.now()
  const method = options?.method || 'GET'
  const endpoint = url.match(
    /((?!\S+\s)?\S*[/].*?(?:\S+\s)?\S*[/])([\s\S]*)/,
  )[2]

  const response = await fetch(url, options)
  console.log(`${method}${response.status}: ${Date.now() - ts}ms /${endpoint}`)

  if (response.ok) {
    return response.json()
  }
  throw response.json()
}

export default processFetchRequest
