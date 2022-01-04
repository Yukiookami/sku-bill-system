/*
 * @Author: zxy
 * @Date: 2022-01-04 17:34:46
 * @LastEditTime: 2022-01-04 22:41:59
 * @FilePath: /sku-bill-system/src/request/pay/pay.js
 */
import http from "../http";
/**
 * @description: 获得开销数据
 * @param {*}
 * @return {*}
 */
const httpGetPayDataByTimeAndType = (type, startTime, endTime) => {
  // /expenses?type=1&startTime=2020-01-01&endTime=2021-01-01
  if (type) {
    return http.get(`/expenses?type=${type}&startTime=${startTime}&endTime=${endTime}`)
  } else {
    return http.get(`/expenses?startTime=${startTime}&endTime=${endTime}`)
  }
}

/**
 * @description: 新增开销
 * @param {*}
 * @return {*}
 */
const httpNewPay = (parmas) => {
  return http.post('/expenses', parmas)
}

/**
 * @description: 删除开销
 * @param {*}
 * @return {*}
 */
const httpDelPay = (id) => {
  return http.del(`/expenses/${id}`)
}

/**
 * @description: 修改开销
 * @param {*}
 * @return {*}
 */
const httpEditPay = (params) => {
  return http.put('/expenses', params)
}

export {
  httpGetPayDataByTimeAndType,
  httpNewPay,
  httpDelPay,
  httpEditPay
}