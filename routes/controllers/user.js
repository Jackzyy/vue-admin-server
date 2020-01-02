'use strict'

const { UserModel } = require('../../db/db.config')
const { tokenVerify } = require('../../utils')

module.exports = class UserController {
  /**
   * 用户注册
   * @param {Object} ctx
   */
  // static async register(ctx) {}

  /**
   * 用户登陆
   * @param {Object} ctx
   */
  static async login(ctx) {
    let userName = ctx.checkBody('userName').notEmpty().value
    let password = ctx.checkBody('pwd').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, 10001, ctx.errors)
      return
    }

    let userInfo = await UserModel.findOne(
      {
        user: userName,
        pwd: password
      },
      '-_id user desc'
    )

    // 登录异常
    if (!userInfo) {
      ctx.body = ctx.codeMap.refail('用户名或密码错误')
      return
    }

    // 正常登陆
    let token = await tokenVerify.setToken('admin')
    ctx.body = ctx.codeMap.resuccess({ userInfo, token })
  }

  /**
   * 用户修改密码
   * @param {Object} ctx
   */
  static async editPwd(ctx) {
    try {
      let userName = ctx.state.user.userName
      let body = ctx.request.body

      // 更新用户信息
      try {
        let result = await UserModel.findOneAndUpdate(
          {
            user: userName,
            pwd: body.oldPwd
          },
          {
            pwd: body.newPwd
          },
          { new: true }
        )

        // 失败向外层抛出异常
        if (!result) throw false
      } catch (error) {
        throw new Error(error)
      }

      ctx.body = {
        code: 200,
        msg: '密码更新成功'
      }
    } catch (error) {
      ctx.body = {
        msg: '密码更新失败'
      }
    }
  }
}
