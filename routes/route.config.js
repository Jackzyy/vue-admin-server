'use strict'

const router = require('koa-router')
const { user } = require('./controllers')
const apiRouter = new router({ prefix: '/api' })

module.exports = apiRouter
  .post('/user/login', user.login)
  .post('/user/edit_pwd', user.editPwd)
