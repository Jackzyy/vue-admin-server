const Joi = require('joi')

// 验证字段
const schema = Joi.object({
  // 用户
  username: Joi.string()
    .min(3)
    .max(10)
    .required(),
  password: Joi.string()
    .min(6)
    .max(10)
    .required()
})

const option = {
  allowUnknown: true,
  abortEarly: true
}

module.exports = function validate(ctx) {
  let result = Joi.validate(ctx.request.body, schema, option)
  if (result.error) ctx.body = ctx.codeMap.refail(null, '10001', result.error)
  return ctx.body
}
