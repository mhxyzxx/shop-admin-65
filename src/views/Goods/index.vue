<template>
<div class="goods-wrap">
  <!-- 操作选项 -->
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        placeholder="请输入内容">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary">添加商品</el-button>
    </el-col>
  </el-row>
  <!-- /操作选项 -->

  <!-- 数据列表 -->
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  <!-- /数据列表 -->

  <!-- 数据分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
  <!-- /数据分页 -->
</div>
</template>

<script>
export default {
  name: 'GoodsList',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
</style>
