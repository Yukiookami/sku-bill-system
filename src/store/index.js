/*
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-04 22:23:09
 * @FilePath: /sku-bill-system/src/store/index.js
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前编辑的数据
    nowEditData: ''
  },
  mutations: {
    /**
     * @description: 添加/删除当前编辑数据
     * @param {*}
     * @return {*}
     */    
    setNowEditData (state, data) {
      state.nowEditData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
