/** @format */

const tokenKey = 'jwt'
export const getToken = (): string => localStorage.getItem(tokenKey)
export const setToken = (token: string): void =>
  localStorage.setItem(tokenKey, token)
export const removeToken = (): void => localStorage.removeItem(tokenKey)
