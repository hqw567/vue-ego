import axios from 'axios'
import base from './base'

const qs = require('querystring')
const api = {
  getLogin(params) {
    return axios.post(base.login, qs.stringify(params))
  },
  getGoodsList(params) {
    return axios.get(base.goodsList, {
      params
    })
  },
  getGoodsSearch(params) {
    return axios.get(base.goodsSearch, {
      params
    })
  },
  getCategory(params) {
    return axios.get(base.selectItemCategory, {
      params
    })
  },
  AddGoods(params) {
    return axios.get(base.addGoods, {
      params
    })
  },
  deleteGoods(params) {
    return axios.get(base.deleteGoods, {
      params
    })
  },
  updateGoods(params) {
    return axios.get(base.updateGoods, {
      params
    })
  },
  getParams(params) {
    return axios.get(base.params, { params })
  },
  addItemParam(params) {
    return axios.get(base.addItemParam, {
      params
    })
  }
}

export default api
