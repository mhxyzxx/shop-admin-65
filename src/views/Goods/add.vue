<template>
  <div class="goods-add-wrap">
    <!-- 步骤条 -->
    <el-steps finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- /步骤条 -->

    <!-- 侧边导航标签页 -->
    <el-tabs tab-position="left" @tab-click="handleTabChange">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <!--
              v-model 支持 number 修饰符，自动将数据转换为数字
             -->
            <el-input v-model.number="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model.number="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model.number="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!--
              级联选择器
              options 数据（树结构的数据）
              v-model 选中的节点的id数组，会同步到指定的数据上
              change 选中节点改变事件
             -->
            <el-cascader
              :options="goodsCategories"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              }"
              v-model="formData.goods_cat">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formData.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.prevent="handleSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
    <!-- /侧边导航标签页 -->
  </div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category'
import { addGoods } from '@/api/goods'
import { getGoodsCategoryAttrs } from '@/api/goods-category-attr'

export default {
  name: 'GoodsAdd',
  data () {
    return {
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: ''
      },
      goodsCategories: [], // 所有商品分列表（树格式）
      goodsCategoryAttrs: [] // 所选择分类的参数数据
    }
  },

  created () {
    this.loadGoodsCategories()
  },

  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await  getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    async handleSubmit () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight } = this.formData

      const { data, meta } = await addGoods({
        goods_name,
        goods_cat: goods_cat.join(','), // 接口要求商品分类传递一个以 , 分割的字符串列表
        goods_price,
        goods_number,
        goods_weight
      })

      if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },

    handleTabChange (currentTab) {
      if (currentTab.label === '商品参数') {
        // 根据在第一个 tab 选中的分类 id 动态请求加载商品参数
        const { goods_cat } = this.formData
        if (goods_cat.length === 0) {
          return this.$message({
            type: 'warning',
            message: '请选择商品分类'
          })
        }

        // 如果用户选择了商品分类，则动态就加载分类参数
        this.loadGoodsCategoryAttrs()
      }
    },

    async loadGoodsCategoryAttrs () {
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1])
      if (meta.status === 200) {
        console.log(123)
        this.goodsCategoryAttrs = data
      }
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}
</style>
