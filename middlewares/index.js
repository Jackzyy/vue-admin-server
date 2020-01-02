const codeMap = require('./code_map')

module.exports = class Middleware {
  static util(ctx, next) {
    ctx.codeMap = codeMap
    return next()
  }

  static async catchAuthorizationErr(ctx, next) {
    return next().catch(err => {
      if (401 == err.status) {
        ctx.status = 401
        ctx.body = {
          status: 401,
          msg: '登录过期，请重新登录'
        }
      } else {
        throw err
      }
    })
  }
}
