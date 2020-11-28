interface Window {
  app: any
}
type Action<T> = () => T
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
