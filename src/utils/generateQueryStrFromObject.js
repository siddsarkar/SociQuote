/**
 * Returns query string from object
 * @param {{ [param: string]: string|number|boolean }} obj query params as object
 * @example generateQueryStrFromObject({"q":"any","page":1}) returns "?q=any&page=1"
 */
const generateQueryStrFromObject = obj =>
  Object.keys(obj)
    .map((key, idx) => {
      if (idx === 0) {
        return `?${key}=${obj[key]}`
      }
      return `&${key}=${obj[key]}`
    })
    .join('')

export default generateQueryStrFromObject
