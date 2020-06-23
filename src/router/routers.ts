/** @format */

import Layout from '@/layout/index.vue'

import {RouteConfig} from 'vue-router'
/** 固定路由 无权限控制 */
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: 's-home',
      hidden: true
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'home',
    meta: {
      title: '首页',
      icon: 's-home'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'data-line'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'article',
    meta: {
      title: 'Article',
      icon: 'document'
    },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        meta: {
          title: '文章列表'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/article/list.vue')
      },
      {
        path: 'edit',
        name: 'ArticleEdit',
        meta: {
          title: '编辑文章'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/article/edit.vue')
      }
    ]
  }
]
