/** @format */

import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

/** 固定路由 无权限控制 */
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
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
    name: 'Home',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '看板',
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
    name: 'Article',
    meta: {
      title: '笔记',
      icon: 'document'
    },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        meta: {
          title: '笔记',
          icon: 'document'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/lists/article.vue')
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    name: 'Category',
    meta: {
      title: '分类&标签',
      icon: 'document'
    },
    children: [
      {
        path: 'category',
        name: 'CategoryList',
        meta: {
          title: '分类'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "categoryManage" */ '@/views/lists/category.vue')
      },
      {
        path: 'tag',
        name: 'TagList',
        meta: {
          title: '标签'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "categoryManage" */ '@/views/lists/tag.vue')
      }
    ]
  }
]
