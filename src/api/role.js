/**
 * 角色的接口封装
 */
import request from '@/utils/request'

/**
* 获取角色列表
*/
export const getRoleList = () => request({
  method: 'GET',
  url: '/roles'
}).then(res => res.data)
