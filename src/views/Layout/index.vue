<template>
<el-container>
  <el-header>
    <AppHeader></AppHeader>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <!-- 导航组件 -->
      <NavMenu></NavMenu>
      <!-- /导航组件 -->
    </el-aside>
    <el-main>
      <!-- Layout 的 children 子路由会展示到这里 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppHeader from './header.vue'
import NavMenu from './navmenu.vue'

export default {
  name: 'Layout',
  data () {
    return {}
  },
  methods: {
  },
  components: {
    AppHeader,
    NavMenu
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

.el-submenu .fas {
  margin-right: 5px;
}

.el-main {
  background-color: #e9eef3;
}

.el-menu {
  height: 100%;
}
</style>
