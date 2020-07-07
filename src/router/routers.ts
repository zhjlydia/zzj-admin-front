/** @format */

import Layout from '@/layout/index.vue'

import {RouteConfig} from 'vue-router'
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
          title: '笔记列表'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/article/list.vue')
      },
      {
        path: 'edit',
        name: 'ArticleEdit',
        meta: {
          title: '新建笔记'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/article/edit.vue')
      },
      {
        path: 'detail',
        name: 'ArticleDetail',
        meta: {
          hidden: true,
          title: '笔记详情'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "articleDetail" */ '@/views/article/detail.vue')
      }
    ]
  },
  {
    path: '/classification',
    component: Layout,
    redirect: '/classification/manage',
    name: 'Classification',
    meta: {
      title: '分类&标签',
      icon: 'document'
    },
    children: [
      {
        path: 'manage',
        name: 'ClassificationManage',
        meta: {
          title: '分类&标签',
          icon: 'collection-tag'
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        component: () => import(/* webpackChunkName: "classificationManage" */ '@/views/classification/index.vue')
      }
    ]
  }
]
