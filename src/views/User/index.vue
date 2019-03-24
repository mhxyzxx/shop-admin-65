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

  <!-- 操作选项 -->
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        placeholder="请输入内容"
        v-model="searchText">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary">添加用户</el-button>
    </el-col>
  </el-row>
  <!-- /操作选项 -->

  <!-- /卡片头部 -->
  <!-- 卡片内容 -->

  <!--
    表格组件
    data 是表格的数据
    stripe 斑马纹
    border 带边框
    el-table-column 表格列组件
      你只需要设计表格列：列名+列值
      label 列名
      prop 数据名
      width 列宽，默认 px
    它内部会自动去遍历 data 数据，循环生成表格列
  -->
  <el-table
    :data="users"
    stripe
    border
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
  </el-table>
  <!-- /表格组件 -->
</el-card>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      searchText: ''
    }
  },
  async created () {
    console.log('2. token 存在，进入了具体的业务组件')
    // 除了登录接口，其它接口都需要身份令牌才能访问
    // 所有需要授权（提供 token）的接口都需要像下面这样来写
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      const { data } = await getUserList({ pagenum: 1, pagesize: 100 })
      this.users = data.users
    }
  }
}
</script>

<style scoped>
.el-card {
  height: 100%;
}

.el-table {
  margin-top: 15px;
}
</style>
