'use strict'

const { RoleModel } = require('../../../db/db.config')

module.exports = class RoleController {
  /**
   * 禁止修改Admin权限
   * @param {String} name
   * @param {Object} ctx
   */
  static defendAdmin(name, ctx) {
    if (name === 'admin') {
      ctx.body = ctx.codeMap.refail('超级管理员角色禁止编辑！')
      return false
    }
    return true
  }

  /**
   * 创建角色权限
   * @param {Object} ctx
   */
  static async createRole(ctx) {
    let name = ctx
      .checkBody('name')
      .notEmpty()
      .len(1, 10).value
    let pages = ctx.checkBody('pages').value
    let desc = ctx.checkBody('desc').value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    let result = await RoleModel.findOne({ name })
    if (result) {
      ctx.body = ctx.codeMap.refail('角色已存在')
      return
    }
    await RoleModel.insertMany({
      name,
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
    let name = ctx.checkBody('name').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    if (!RoleController.defendAdmin(name, ctx)) return

    await RoleModel.findOneAndDelete({ name })
    ctx.body = ctx.codeMap.resuccess()
  }

  /**
   * 编辑角色权限
   * @param {Object} ctx
   */
  static async editRole(ctx) {
    let name = ctx
      .checkBody('name')
      .notEmpty()
      .len(1, 10).value
    let pages = ctx.checkBody('pages').value
    let desc = ctx.checkBody('desc').value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, '10001', ctx.errors)
      return
    }

    if (!RoleController.defendAdmin(name, ctx)) return

    await RoleModel.findOneAndUpdate(
      { name },
      {
        name,
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
   * 查询用户角色权限
   * @param {Object} ctx
   */
  static async queryRole(ctx) {
    let roleInfo = await RoleModel.find({}, 'name pages').limit(20)
    ctx.body = ctx.codeMap.resuccess(roleInfo)
  }
}
