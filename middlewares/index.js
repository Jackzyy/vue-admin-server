'use strict'

const codeMap = require('./code_map')
const util = require('../utils')

module.exports = class Middleware {
  static util(ctx, next) {
    ctx.codeMap = codeMap
    return next()
  }

  static async catchAuthorizationErr(ctx, next) {
    return next().catch(err => {
      if (401 == err.status) {
        ctx.status = 401
        ctx.codeMap.refail(null, '401')
      } else {
        throw err
      }
    })
  }

  static async addUserToCtx(ctx, next) {
    let token = ctx.headers.authorization
    if (token) ctx.state.user = await util.tokenVerify.varToken(token)
    return next()
  }
}
