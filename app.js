const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koa_jwt = require('koa-jwt')
const validate = require('koa-validate')

const routerConfig = require('./routes/route.config')
const middleware = require('./middlewares')
const { signKey } = require('./utils')

const app = new Koa()

validate(app)

// middlewares
app
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(__dirname + '/views', { extension: 'pug' }))
  .use(bodyparser({ multipart: true }))
  .use(routerConfig.routes(), routerConfig.allowedMethods())
  .use(middleware.util)
  .use(middleware.catchAuthorizationErr)
  .use(
    koa_jwt({
      secret: signKey
    }).unless({
      path: ['/api/user/login']
    })
  )

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
