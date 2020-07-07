/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import * as directives from '@/directives'
import {DirectiveOptions} from 'vue'

Vue.config.productionTip = false
Vue.use(ElementUI)

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as {[key: string]: DirectiveOptions})[key])
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
