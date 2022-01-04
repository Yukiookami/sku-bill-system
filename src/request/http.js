/*
 * @Author: zxy
 * @Date: 2022-01-01 20:05:06
 * @LastEditTime: 2022-01-04 16:53:39
 * @FilePath: /sku-bill-system/src/request/http.js
 */
import request from "./request";

const http = {
  get(url, params) {
    const config = {
      method: 'get',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params) {
    const config = {
      method: 'post',
      url: url
    }
    if (params) config.data = JSON.stringify(params)
    return request(config)
  },
  put(url, params) {
    const config = {
      method: 'put',
      url: url
    }
    if (params) config.data = JSON.stringify(params)
    return request(config)
  },
  del(url, params) {
    const config = {
      method: 'delete',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  patch(url, params) {
    const config = {
      method: 'patch',
      url: url
    }
    if (params) config.data = params
    return request(config)
  }
}

export default http