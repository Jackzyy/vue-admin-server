'use strict'

const { UserModel } = require('../../db/db.config')
const { tokenVerify } = require('../../utils')

module.exports = class UserController {
  /**
   * 用户登陆
   * @param {Object} ctx
   */
  static async login(ctx) {
    try {
      let body = ctx.request.body
      let userInfo = await UserModel.findOne(
        {
          user: body.userName,
          pwd: body.pwd
        },
        '-_id user desc'
      )
      console.log('aaa')

      // 登录异常
      if (!userInfo) throw false

      // 正常登陆
      let token = await tokenVerify.setToken('admin')
      ctx.body = {
        code: 200,
        msg: '登陆成功',
        userInfo,
        token
      }
    } catch (error) {
      ctx.body = {
        code: 210,
        msg: '用户名或密码错误'
      }
      throw error
    }
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
