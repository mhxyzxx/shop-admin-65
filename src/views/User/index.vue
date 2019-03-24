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
    console.log('2. token 存在，进入了具体的业务组件')
    // 除了登录接口，其它接口都需要身份令牌才能访问
    // 所有需要授权（提供 token）的接口都需要像下面这样来写
    const res = await request({
      method: 'GET',
      url: '/users?pagenum=1&pagesize=5'
    })
  }
}
</script>

<style>
</style>
