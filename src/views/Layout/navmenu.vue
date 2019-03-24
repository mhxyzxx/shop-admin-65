<template>
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  @open="handleOpen"
  @close="handleClose">
  <el-submenu index="1">
    <template slot="title">
      <!-- <i class="el-icon-location"></i> -->
      <i class="fas fa-user fa-lg"></i>
      <span>用户管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span>用户列表</span>
        </template>
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>权限管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="2-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>角色列表</span>
        </template>
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="2-2">权限列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>商品管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="3-1">商品列表</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="3-2">分类参数</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="3-2">商品分类</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>订单管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="4-1">订单列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="5">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>数据统计</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="5-1">数据报表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
