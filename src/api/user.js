/**
 * 用户的接口封装
 */
import request from '@/utils/request'

export const getUserList = ({ pagenum = 1, pagesize = 5 }) => {
  // const { pagenum = 1, pagesize = 5 } = 你传递的那个对象
  return request({
    method: 'GET',
    url: '/users',
    params: { // 传递 GET 参数
      pagenum,
      pagesize
    }
  }).then(res => res.data)
}
