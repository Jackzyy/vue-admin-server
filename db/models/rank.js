var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * @name 游戏名
 * @rank 游戏排行
 * @score 游戏评分
 * @tag 游戏标签
 * @arg 数据时间范围 yesterday：昨天， week：一周，all：30天
 * @type 游戏分类 0：热游榜， 1：评分榜， 2：爆肝榜
 * @full_detail 单项JSON具体数据
 */
const gameSchema = new Schema(
  {
    name: String,
    rank: Number,
    score: String,
    tag: String,
    arg: String,
    type: Number,
    full_detail: Schema.Types.Mixed
  },
  {
    collection: 'mi_rank',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false
  }
)

var gameModel = mongoose.model('mi_rank', gameSchema)

module.exports = gameModel
