<template>
<el-card class="box-card">
  <!-- 卡片头部 -->
  <div slot="header" class="clearfix">
    <!-- 面包屑路径导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- /面包屑路径导航组件 -->
  </div>
  <!-- /卡片头部 -->
  <!-- 卡片内容 -->
</el-card>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  name: 'UserList',
  data () {
    return {}
  },
  async created () {
    console.log('2. token 存在，进入了具体的业务组件')
    // 除了登录接口，其它接口都需要身份令牌才能访问
    // 所有需要授权（提供 token）的接口都需要像下面这样来写
    const { data } = await getUserList({ pagesize: 1 })
    console.log(data)
  }
}
</script>

<style scoped>
.el-card {
  height: 100%;
}
</style>
