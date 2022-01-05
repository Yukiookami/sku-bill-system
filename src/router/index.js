/*
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-05 17:33:11
 * @FilePath: /sku-bill-system/src/router/index.js
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 路由
import billRouter from './billRouter'

let routes = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404NotFind.vue'),
    meta: {
      title: '404！'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/billLogin.vue'),
    meta: {
      title: 'Login'
    }
  }
]

routes = routes.concat(billRouter)

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
