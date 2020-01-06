'use strict'

const router = require('koa-router')
const { db, user, role, reptile } = require('./controllers')
const apiRouter = new router({ prefix: '/api' })

module.exports = apiRouter
  // DB查询测试
  .get('/db', db.dbQuery)

  // 用户
  .post('/user/login', user.login)
  .post('/user/edit_pwd', user.editPwd)
  .post('/user/edit_role', user.editUserRole)
  .post('/user/register', user.register)
  .get('/user/query_role', user.queryRole)

  // 权限角色
  .post('/role/create', role.createRole)
  .post('/role/edit', role.editRole)
  .post('/role/del', role.delRole)
  .get('/role/query', role.queryRole)

  // 爬虫-小米热游
  .post('/reptile/mi', reptile.mi.crawlStart) // 爬取
