/**
 * 商品接口封装
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 */
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => request({
  method: 'GET',
  url: '/goods',
  params: { // GET 参数
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)
