<template>
<el-container>
  <el-header>
    <el-row class="app-header">
      <el-col :span="4">
        <img src="./logo.png" alt="黑马程序员">
      </el-col>
      <el-col :span="16">
        黑马程序员
      </el-col>
      <el-col :span="4">
        <a href="#">退出</a>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <!-- 导航组件 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">用户列表</el-menu-item>
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
      <!-- /导航组件 -->
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Layout',
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

<style scoped>
.el-header {
  background-color: #b3c0d1;
}

.app-header {
  display: flex;
  align-items: center;
}

.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
}

.el-menu {
  height: 100%;
}
</style>
