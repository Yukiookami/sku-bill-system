/*
 * @Author: zxy
 * @Date: 2022-01-01 20:05:02
 * @LastEditTime: 2022-01-06 09:38:37
 * @FilePath: /sku-bill-system/src/request/request.js
 */
import axios from "axios";
import {
  ElMessage
} from "element-plus";
import config from "../config";
import router from "../router";
import storage from "../until/storage";

export function request(option) {
  // 创建axios实例对象，添加全局配置
  const service = axios.create({
    baseURL: config.EnvConfig.pord.baseAPI,
    timeout: 80000
  })

  // 请求发送之前拦截
  service.interceptors.request.use((req) => {
    const headers = req.headers

    const token = storage.getItem('bill_token') || '';
    req.headers['Content-Type'] = 'application/json'

    // 'Bearer ' + 
    // Authorization
    if (token) headers.token = token;

    return req
  })

  // 响应拦截
  service.interceptors.response.use((res) => {
    const {
      status,
      data,
      msg
    } = res.data;

    if (status === 2000) {
      return res.data;
    } else {
      // token过期 
      storage.clearItem('bill_token')
      storage.clearItem('user_info')
      router.push('/login')
      return Promise.reject(msg)
    }
  })

  /**
   * @description: 请求函数
   * @param {*}
   * @return {*}
   */
  return service(option)
}

export default request