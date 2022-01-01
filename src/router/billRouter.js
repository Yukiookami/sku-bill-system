/*
 * @Author: zxy
 * @Date: 2022-01-01 19:56:04
 * @LastEditTime: 2022-01-01 20:46:30
 * @FilePath: /sku-bill-system/src/router/billRouter.js
 */
export default [
  {
    path: '/',
    redirect: '/bill'
  },
  {
    path: '/bill',
    name: 'bill',
    component: () => import('../views/bill/billSystem.vue'),
    meta: {
      title: 'SKU账单系统',
      requiresBillAuth: true
    }
  }
]