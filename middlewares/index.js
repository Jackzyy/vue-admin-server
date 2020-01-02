const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

const utilFn = {
  resuccess(data) {
    return {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null
    }
  },
  refail(message, code, data) {
    return {
      code: code || -1,
      success: false,
      message: message || codeMap[code],
      data: data || null
    }
  }
}

module.exports = class Middleware {
  static util(ctx, next) {
    ctx.util = utilFn
    return next()
  }

  static async catchAuthorizationErr() {
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
