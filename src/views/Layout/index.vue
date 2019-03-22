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
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {}
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
</style>
