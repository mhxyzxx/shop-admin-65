/**
 * 商品分类参数接口封装
 */

import request from '@/utils/request'

/**
 * 获取商品分类参数列表
 * sel 是 only 或者 many
 */
export const getGoodsCategoryAttrs = (catId, sel = 'many') => request({
  method: 'GET',
  url: `/categories/${catId}/attributes`,
  params: { // GET 参数
    sel
  }
}).then(res => res.data)
