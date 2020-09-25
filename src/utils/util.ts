import { isEqual, isObject, transform } from 'lodash'
/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(targetObject: object, baseObject: object) {
  function changes(object: any, base: any) {
    return transform(object, (result: any, value: any, key: any) => {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value
      }
    })
  }
  return changes(targetObject, baseObject)
}

/**
 * Get only dirty properties
 *
 * @param original Original object
 * @param modified Modified object
 */
export function dirty<T extends Record<string, any>>(original: T, modified: Partial<T>): Partial<T> {
  return (
    modified &&
    Object.entries(modified)
      .filter(([k, v]) => k in original && JSON.stringify(original[k]) !== JSON.stringify(v))
      .reduce((p: any, [k, v]) => {
        if (!p) {
          p = {}
        }
        p[k] = v
        return p
      }, null)
  )
}
