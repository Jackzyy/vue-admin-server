const router = require('koa-router')()
const ut = require('./controller/ut')

router.get('/mi-rank', async () => {
  // 热游榜
  let timeArrA = ['yesterday', 'week', 'month']
  let typeArrA = [7]
  ut.getData(timeArrA, typeArrA)

  // 评分榜
  let timeArrB = ['week', 'month', 'all']
  let typeArrB = [8]
  ut.getData(timeArrB, typeArrB)

  // 爆肝榜
  let timeArrC = ['all']
  let typeArrC = [9]
  ut.getData(timeArrC, typeArrC)
})

module.exports = router
