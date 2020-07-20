/** @format */

import router from './router'
import {Route} from 'vue-router'
import * as user from '@/store/modules/user'
import store from '@/store'
import {getToken} from '@/plugins/cookies'

const whiteList = ['/login']

router.beforeEach(async(to : Route, _ : Route, next : any) => {
  console.log(user.state)
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!user.state.user) {
        try {
          let res = await store.dispatch('user/getUser')
          next()
        } catch (error) {
          console.log(error)
          //   next({path: '/'})
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to : Route) => {})
