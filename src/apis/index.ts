/** @format */

import axios from 'axios'

const http = axios.create({ baseURL: 'api/' })
import store from '@/store'

http.interceptors.request.use(
  async config => {
    await store.dispatch('user/getTokenFromStorage')
    if (store.state.user && store.state.user.token) {
      config.headers.authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  res => {
    if (res.status === 204) {
      return res.data
    }
    if (res.status === 401) {
      return res
    }
    if (res.data.code) {
      return Promise.reject(new Error(res.data.message))
    }
    return res.data.data
  },
  error => {
    if (error.response.status === 401) {
      if (window.app) {
        window.app.$router.push({ path: './login' })
      }
    }
    if (error.response.status === 400) {
      if (window.app) {
        window.app.$message.error(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

export default http
