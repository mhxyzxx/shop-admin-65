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

/**
 * 添加角色
 */
export const addRole = ({ roleName, roleDesc }) => request({
  method: 'POST',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)
