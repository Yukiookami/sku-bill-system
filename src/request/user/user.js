/*
 * @Author: zxy
 * @Date: 2022-01-05 14:45:01
 * @LastEditTime: 2022-01-05 14:49:14
 * @FilePath: /sku-bill-system/src/request/user/user.js
 */
import http from "../http";

/**
 * @description: 获得user信息
 * @param {*}
 * @return {*}
 */
const httpGetUserInfo = (id) => {
  return http.get(`/user/user?id=${id}`)
}

export {
  httpGetUserInfo
}