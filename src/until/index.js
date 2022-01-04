/*
 * @Author: zxy
 * @Date: 2022-01-04 14:30:44
 * @LastEditTime: 2022-01-04 17:23:24
 * @FilePath: /sku-bill-system/src/until/index.js
 */

import { ElMessage } from "element-plus";
import router from "../router";

/**
 * @description: 节流
 * @param {function} fn
 * @param {numebr} gapTime
 * @return {function}
 */
 const throttle = (fn, gapTime) => {
  let _lastTime = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}

/**
 * @description: 返回请求时，弹出消息框
 * @param {object} obj 正常为 res
 * @param {function} fn 需要执行的回执操作，可以为null
 * @return {*}
 */
 const returnMessage = (obj) => {
  let funObj = {
    success: fn => {
      fn && fn()
      return funObj
    },
    error: fn => {
      fn && fn()
      return funObj
    }
  }

  if (obj.status === 2000) {
    ElMessage({
      message: obj.msg,
      type: 'success'
    })

    funObj.success()
  } else {
    ElMessage({
      message: obj.msg,
      type: 'error'
    })

    funObj.error()
  }

  return funObj
}

/**
 * @description: 检查对象是否有空
 * @param {*}
 * @return {*}
 */
const checkObjIsEmpty = (obj) => {
  for (let i in obj) {
    if (!obj[i].trim()) {
      return true
    }
  }

  return false
} 

/**
 * @description: 进行页面跳转，可携带参数
 * @param {string} path
 * @param {object} params
 * @param {string} jump 是否新开页面打开
 * @return {*}
 */
 const goToPage = (path, params, jump) => {
  console.log(path)
  if (!jump) {
    params ? 
    router.push({
      path,
      query: params
    }) : router.push(path)
  } else {
    const { href } = params ? 
    router.resolve({
      path,
      query: params
    }) : router.resolve(path)

    window.open(href, "_blank")
  }
}

export {
  throttle,
  returnMessage,
  checkObjIsEmpty,
  goToPage
}