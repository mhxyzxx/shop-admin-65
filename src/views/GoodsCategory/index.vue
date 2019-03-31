<template>
<div>
  <el-row>
    <el-col :span="4">
      <el-button type="primary">添加分类</el-button>
    </el-col>
  </el-row>

  <!-- 列表数据 -->
  <!--
    table 组件如果探测到你的数据是嵌套的数据结构，也就是 tree 结构
    说白了，它会自动探测数据中 children 属性
    有 children 它就自动渲染表格树
    row-key 需要告诉它你的数据中哪个字段可以表示唯一
   -->
  <el-table
    :data="goodsCategories"
    style="width: 100%;margin-bottom: 20px;"
    border
    row-key="cat_id">
    <el-table-column
      prop="cat_name"
      label="分类名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="是否有效"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.cat_deleted ? '无效' : '有效' }}
      </template>
    </el-table-column>
    <el-table-column
      label="排序">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.cat_level] }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger">删除</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- /列表数据 -->
</div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category'

export default {
  name: 'GoodsCategory',
  data () {
    return {
      goodsCategories: []
    }
  },

  created () {
    this.loadGoodsCategories()
  },

  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    }
  }
}
</script>

<style>
</style>
