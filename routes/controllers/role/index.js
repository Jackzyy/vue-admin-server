'use strict'

const { RoleModel } = require('../../../db/db.config')

module.exports = class RoleController {
  /**
   * 创建角色权限
   * @param {Object} ctx
   */
  static async createRole(ctx) {
    let role = ctx
      .checkBody('role')
      .notEmpty()
      .len(1, 10).value
    let pages = ctx.checkBody('pages').value
    let desc = ctx.checkBody('desc').value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    let result = await RoleModel.findOne({ role })
    if (result) {
      ctx.body = ctx.codeMap.refail('角色已存在')
      return
    }
    await RoleModel.insertMany({
      role,
      pages,
      desc
    })
    ctx.body = ctx.codeMap.resuccess()
  }

  /**
   * 删除角色权限
   * @param {Object} ctx
   */
  static async delRole(ctx) {
    let role = ctx.checkBody('role').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    await RoleModel.findOneAndDelete({ role })
    ctx.body = ctx.codeMap.resuccess()
  }

  /**
   * 编辑角色权限
   * @param {Object} ctx
   */
  static async editRole(ctx) {
    let role = ctx
      .checkBody('role')
      .notEmpty()
      .len(1, 10).value
    let pages = ctx.checkBody('pages').value
    let desc = ctx.checkBody('desc').value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    await RoleModel.findOneAndUpdate(
      { role },
      {
        role,
        pages,
        desc
      },
      {
        new: true
      }
    )
    ctx.body = ctx.codeMap.resuccess()
  }

  /**
   * 查询角色权限
   * @param {Object} ctx
   */
  static async queryRole(ctx) {
    let role = ctx.checkBody('role').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    let roleInfo = await RoleModel.findOne({ role })
    ctx.body = ctx.codeMap.resuccess(roleInfo)
  }
}

