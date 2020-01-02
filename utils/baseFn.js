'use strict'

module.exports = class BaseFn {
  /**
   * 异步延迟
   * @param {number} time 延迟时间,单位毫秒
   */
  static sleep(time = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
}
