const mongoose = require('mongoose')

// 数据库开启认证 依赖于admin库，需要加上'authSource=admin'
mongoose.connect(
  'mongodb://root:123456@localhost:27017/admin_db?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)
const db = mongoose.connection

db.once('open', () => {
  console.log('连接成功')
})

db.on('error', err => {
  console.log('连接失败', err)
})

module.exports = mongoose
