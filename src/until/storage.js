/*
 * @Author: zxy
 * @Date: 2022-01-04 13:55:22
 * @LastEditTime: 2022-01-04 13:56:02
 * @FilePath: /sku-bill-system/src/until/storage.js
 */
import config from "../config"

export default {
  /**
   * @description: 根据命名空间存储到storage中
   * @param {*} key
   * @param {*} val
   * @return {*}
   */  
  setItem (key, val) {
    let storage = this.getStorage()
    storage[key] = val

    localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  /**
   * @description: 根据key从storage中获得元素
   * @param {*} key
   * @return {*}
   */  
  getItem(key) {
    return this.getStorage()[key]
  },
  /**
   * @description: 获取命名空间中的值
   * @param {*}
   * @return {*}
   */  
  getStorage () {
    return JSON.parse(localStorage.getItem(config.namespace) || "{}")
  },
  /**
   * @description: 根据key删除命名空间内的元素
   * @param {*} key
   * @return {*}
   */  
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]

    localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  /**
   * @description: 删除整个命名空间
   * @param {*}
   * @return {*}
   */  
  cleadrAll () {
    localStorage.removeItem(config.namespace)
  }
}