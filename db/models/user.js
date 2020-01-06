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
    role:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'adm_role'
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
