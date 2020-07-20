/** @format */

import axios from 'axios'
import {getToken} from '@/plugins/cookies'

const http = axios.create({baseURL: 'api/'})

http
  .interceptors
  .request
  .use(config => {
    const token = getToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

http
  .interceptors
  .response
  .use(res => {
    console.log(res)
    if (res.status === 204) {
      return res.data
    }
    if (res.data.code) {
      return Promise.reject(new Error(res.data.message))
    }
    return res.data
  }, error => {
    return Promise.reject(error)
  })

export default http
