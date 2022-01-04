/*
 * @Author: zxy
 * @Date: 2022-01-04 22:50:19
 * @LastEditTime: 2022-01-04 22:51:51
 * @FilePath: /sku-bill-system/src/request/budget/budget.js
 */
import http from "../http";

/**
 * @description: 修改预算
 * @param {*}
 * @return {*}
 */
const httpEditBudget = (params) => {
  return http.put('/user/budget', params)
}

export {
  httpEditBudget
}
