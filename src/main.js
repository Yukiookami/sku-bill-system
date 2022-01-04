/*
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-04 13:57:27
 * @FilePath: /sku-bill-system/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css resets
import 'normalize.css';

// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'

// 引入dataV
import dataV from '@jiaminghi/data-view'

// 引入封装的storage
import storage from './until/storage';

const app = createApp(App)

app.use(dataV)
app.use(ElementPlus)

// 全局注册icon
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})

app.use(store).use(router).mount('#app')

// 路由守卫
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title

  //   // 判断是否需要登录
    if (to.meta.requiresBillAuth) {
      // 判断是否有token
      if (storage.getItem('token')) {
        next()
      } else {
        router.push('/login')
      }
    } else {
      next()
    }
  }
})
