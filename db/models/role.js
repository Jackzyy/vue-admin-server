var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * @role 权限名称
 * @list 权限范围
 * @desc 权限描述
 */
const schema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true
    },
    pages: Array,
    desc: String
  },
  {
    collection: 'adm_role',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)

var roleModel = mongoose.model('adm_role', schema)

module.exports = roleModel
