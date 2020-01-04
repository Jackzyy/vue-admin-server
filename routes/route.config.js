'use strict'

const router = require('koa-router')
const { db, user, role } = require('./controllers')
const apiRouter = new router({ prefix: '/api' })

module.exports = apiRouter
  // DB查询测试
  .get('/db', db.dbQuery)

  // 用户
  .post('/user/login', user.login)
  .post('/user/edit_pwd', user.editPwd)
  .post('/user/register', user.register)

  // 用户角色
  .post('/role/create', role.createRole)
  .post('/role/edit', role.editRole)
  .post('/role/del', role.delRole)
  .post('/role/query', role.queryRole)
