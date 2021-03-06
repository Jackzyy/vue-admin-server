const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

module.exports = {
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
