<template>
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
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
  }
}
</script>

<style>
</style>
