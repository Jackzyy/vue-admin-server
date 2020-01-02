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

// // 添加超级管理员
// const admin = new userModel({
//   user: 'admin',
//   pwd: 'admin',
//   desc: 'Super Role'
// })

// admin.save((err, docs) => {
//   if (err) {
//     console.log('添加数据出错')
//     return
//   }
//   console.log(docs)
// })
