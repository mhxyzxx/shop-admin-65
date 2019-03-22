<template>
<div>
  <el-row class="app-header" :gutter="20">
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
</div>
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
.app-header {
  background-color: #ccc;
  display: flex;
  align-items: center;
}
</style>
