/** @format */

import Cookies from 'js-cookie'

const tokenKey = 'jwt'
export const getToken = (): string => Cookies.get(tokenKey)
export const setToken = (token: string): string => Cookies.set(tokenKey, token, {expires: 1})
export const removeToken = (): void => Cookies.remove(tokenKey)
