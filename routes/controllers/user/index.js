'use strict'

const { UserModel } = require('../../../db/db.config')
const { tokenVerify } = require('../../../utils')

module.exports = class UserController {
  /**
   * 用户注册
   * @param {Object} ctx
   */
  static async register(ctx) {
    let username = ctx
      .checkBody('username')
      .notEmpty()
      .len(3, 10).value
    let password = ctx
      .checkBody('pwd')
      .notEmpty()
      .len(6, 10).value
    let desc = ctx.checkBody('pwd').value

    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, 10001, ctx.errors)
      return
    }

    let result = await UserModel.findOne({ user: username })
    if (result) {
      ctx.body = ctx.codeMap.refail('用户名已被使用')
      return
    }

    // 添加用户
    await UserModel.insertMany([
      {
        user: username,
        pwd: password,
        desc: desc
      }
    ])
    ctx.body = ctx.codeMap.resuccess()
  }

  /**
   * 用户登陆
   * @param {Object} ctx
   */
  static async login(ctx) {
    let username = ctx.checkBody('username').notEmpty().value
    let password = ctx.checkBody('password').notEmpty().value

    // 参数异常
    if (ctx.errors) {
      ctx.body = ctx.codeMap.refail(null, 10001, ctx.errors)
      return
    }

    let userInfo = await UserModel.findOne(
      {
        user: username,
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
      let username = ctx.state.user.username
      let body = ctx.request.body

      // 更新用户信息
      try {
        let result = await UserModel.findOneAndUpdate(
          {
            user: username,
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
