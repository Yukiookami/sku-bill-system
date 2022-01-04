/*
 * @Author: zxy
 * @Date: 2022-01-04 14:30:44
 * @LastEditTime: 2022-01-04 14:30:44
 * @FilePath: /sku-bill-system/src/until/index.js
 */
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

export {
  throttle
}