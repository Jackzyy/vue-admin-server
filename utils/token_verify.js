'use strict'

const jwt = require('jsonwebtoken')
const signKey = require('./sign_key')
const jwtConfig = require('config').get('jwt')

class verify {
  // 加密生成Token
  static setToken(username) {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(
          {
            username
          },
          signKey,
          { expiresIn: jwtConfig.expire }
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
