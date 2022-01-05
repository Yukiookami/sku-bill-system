/*
 * @Author: zxy
 * @Date: 2022-01-04 22:50:19
 * @LastEditTime: 2022-01-05 14:34:15
 * @FilePath: /sku-bill-system/src/request/budget/budget.js
 */
import http from "../http";

/**
 * @description: 修改预算
 * @param {*}
 * @return {*}
 */
const httpEditBudget = (budget) => {
  return http.put(`/user/budget?budget=${budget}`)
}

export {
  httpEditBudget
}
