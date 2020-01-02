const axios = require('axios')

const baseUrl = 'http://game.xiaomi.com/api/getRankList'

function request(params) {
  return axios.get(`${baseUrl}`, {
    params
  })
}

module.exports = request
