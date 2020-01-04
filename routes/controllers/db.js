'use strict'

const Models = require('../../db/db.config')

module.exports = class RoleController {
  /**
   * 数据库查询测试
   * @param {Object} ctx
   */
  static async dbQuery() {
    console.log(Models)
    let res = await Models.RoleModel.findById({
      _id: '5e0ecc67a83bc557a8557995'
    })

    console.log(res.pages.constructor == Array)
  }
}
