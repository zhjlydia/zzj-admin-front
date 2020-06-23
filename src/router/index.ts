/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import {constantRoutes} from './routers'

Vue.use(Router)
const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [...constantRoutes]
})

export default router
