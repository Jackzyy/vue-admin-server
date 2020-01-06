const ut = require('../../../../utils/base_fn')
const request = require('./requset')
const gameModel = require('../../../../db/models/rank')

module.exports = class Ut {
  static async getData(timeArr, typeArr) {
    for (let i = 0; i < typeArr.length; i++) {
      for (let j = 0; j < timeArr.length; j++) {
        let startArr = ['start']
        let page = 1

        while (startArr.length !== 0) {
          startArr = (
            await request({
              type: typeArr[i],
              arg: timeArr[j],
              page
            })
          ).data.data.gameList

          if (startArr.length === 0) {
            page = 1
            console.log(`抓取结束：类型${typeArr[i]}--时间${timeArr[j]}--page${page}`)
          } else {
            let insertArr = startArr.map(item => {
              return {
                name: item.gameInfo.displayName,
                rank: item.rank.current,
                score: item.userScore,
                tag: item.tag.map(item => item.name).join('、'),
                arg: timeArr[j],
                type: typeArr[i],
                full_detail: item
              }
            })
            await gameModel.insertMany(insertArr)
          }
          page++
          await ut.sleep(2500)
          console.log(`正在抓取：类型${typeArr[i]}--时间${timeArr[j]}--page${page}`)
        }
      }
    }
  }
}
