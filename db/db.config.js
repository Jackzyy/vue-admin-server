'use strict'

const mongoose = require('mongoose')
const dbConfig = require('config').get('db')

mongoose.connect(dbConfig.dbUrl, dbConfig.options, err => {
  if (err) {
    console.error('connect to %s error: ', dbConfig.dbUrl, err.message)
    throw err
  }
})

module.exports = {
  UserModel: require('./models/user'),
  GameModel: require('./models/rank'),
  RoleModel: require('./models/role')
}
