var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * @user 用户名
 * @pwd 密码
 */
const schema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true
    },
    pwd: {
      type: String,
      required: true
    },
    desc: String
  },
  {
    collection: 'adm_user',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)

module.exports = mongoose.model('adm_user', schema)
