<template>
  <div class="goods-add-wrap">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- /步骤条 -->

    <!-- 侧边导航标签页 -->
    <el-tabs tab-position="left">
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
            <el-select v-model="formData.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formData.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
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
export default {
  name: 'GoodsAdd',
  data () {
    return {
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        region: '',
        is_promote: ''
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
