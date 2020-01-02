'use strict'

const jwt = require('jsonwebtoken')
const signKey = require('./sign_key')

class verify {
  // 加密生成Token
  static setToken(userName) {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(
          {
            userName
          },
          signKey,
          { expiresIn: '1h' }
        )
        resolve(token)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 解密Token
  static varToken(token) {
    return new Promise((resolve, reject) => {
      try {
        var decoded = jwt.verify(token.split(' ')[1], signKey)
        resolve(decoded)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = verify
