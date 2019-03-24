<template>
<div>
  <p>UserList 用户里列表组件</p>
</div>
</template>

<script>
import axios from 'axios'
import request from '@/utils/request'

export default {
  name: 'UserList',
  data () {
    return {}
  },
  async created () {
    // 除了登录接口，其它接口都需要身份令牌才能访问
    // 所有需要授权（提供 token）的接口都需要像下面这样来写
    const res = await request({
      method: 'GET',
      url: '/users?pagenum=1&pagesize=5',
      // headers: { // axios 支持通过 headers 选项添加自定义请求头
      //   Authorization: window.localStorage.getItem('token')
      // }
    })
    if (res.data.meta.status === 401) {
      // 401 说明用户身份有问题
      this.$router.push('/login')
    } else {
      console.log(res.data.data)
    }
  }
}
</script>

<style>
</style>
