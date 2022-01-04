/*
 * @Author: zxy
 * @Date: 2022-01-04 15:38:09
 * @LastEditTime: 2022-01-04 17:10:02
 * @FilePath: /sku-bill-system/src/request/login/login.js
 */

import http from "../http"

/**
 * @description: 用户登录
 * @param {*}
 * @return {*}
 */
const httpUserLogin = (params) => {
  return http.post('/user/login', params)
}

/**
 * @description: 用户注册 
 * @param {*}
 * @return {*}
 */
const httpUserReg = (params) => {
  return http.post('/user/register', params)
}

export {
  httpUserReg,
  httpUserLogin
}
