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
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-row class="attr-row" v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="2">{{ attr.attr_name }}</el-col>
          <el-col :span="22">
            <!--
              1. 它里面可以得到选中的多个节点的 value
            -->
            <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
              <el-checkbox
                :label="val"
                border
                v-for="val in attr.attr_vals.split(',')"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <!--
          :model="formLabelAlign"
          :model="formLabelAlign"
         -->
        <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <!--
          action 上传的接口地址
            上传组件会自动去请求接口进行上传
            由于请求不是我们发送的，所以要写完整的请求路径
            包括接口的 token 都需要我们自己手动的配置
          on-preview 预览成功的处理函数
          :on-remove 删除图片的时候
         -->
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :file-list="fileList"
          :on-success="handleUploadSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <div ref="editor" style="text-align:left"></div>
      </el-tab-pane>
    </el-tabs>
    <!-- /侧边导航标签页 -->

    <el-button type="primary" @click.prevent="handleSubmit">保存</el-button>
    <el-button>取消</el-button>
  </div>
</template>

<script>
import E from 'wangeditor' // 富文本编辑器
import { getGoodsCategoryList } from '@/api/goods-category'
import { addGoods } from '@/api/goods'
import { getGoodsCategoryAttrs } from '@/api/goods-category-attr'
import { getToken } from '@/utils/auth'
import { upload } from '@/api'

export default {
  name: 'GoodsAdd',
  data () {
    return {
      uploadHeaders: { // 上传组件自定义请求头
        Authorization: getToken()
      },
      fileList: [], // 图片列表
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: '', // 是否促销
        goods_introduce: '' // 商品介绍
      },
      checkboxGroup5: [
        '49吋4K超薄曲面 人工智能',
        '55吋4K观影曲面 30核HDR'
      ],
      goodsCategories: [], // 所有商品分列表（树格式）
      goodsCategoryAttrs: [], // 商品属性
      goodsCategoryParams: [] // 商品参数
    }
  },

  created () {
    this.loadGoodsCategories()
  },

  /**
   * 凡是涉及到在初始化的时候需要操作 DOM 的时候，必须写到 mounted 中
   * 因为被 Vue 管理的模板只有在 mounted 挂载完成之后才可以获取到 DOM
   * 记住：只有 mounted 挂载完成之后，才可以通过 this.$refs.xxx 获取到 DOM 元素
   */
  mounted() {
    // 操作 DOM 初始化富文本编辑器
    // this.$refs.editor 就是编辑器容器 DOM 节点
    var editor = new E(this.$refs.editor)

    // 配置服务器端地址
    editor.customConfig.uploadImgServer = 'http://localhost:8888/api/private/v1/upload'

    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法

      const { data, meta } = await upload(files)
      if (meta.status === 200) {
        insert(`http://localhost:8888/${data.tmp_path}`)
      }

      // 上传代码返回结果之后，将图片插入到编辑器中
      // 调用该方法，生成 img 标签，src 指向传递的 imgUrl
      // imgUrl？是上传到服务器的服务端图片访问路径，一个 Web 访问路径 http://xxxx.jpg
      // insert('http://img.redocn.com/201808/20180817/20180817_3beb7f1d22ca9c33139biwRzfgXcizir.png')
    }

    // // 自定义 fileName
    // editor.customConfig.uploadFileName = 'file'

    // // 配置请求上传自定义请求头：添加 token
    // editor.customConfig.uploadImgHeaders = {
    //   Authorization: getToken()
    // }

    // 当编辑器中的内容发生改变的时候，将数据同步到了 Vue 组件中的  formData.goods_introduce 中了
    editor.customConfig.onchange = (html) => {
      this.formData.goods_introduce = html
    }

    // 创建生成
    editor.create()
  },

  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await  getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    /**
     * 添加商品提交
     */
    async handleSubmit () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight, goods_introduce } = this.formData

      // 处理商品属性
      const categoryAttrs = this.goodsCategoryAttrs
        .map(attr => {
          return {
            attr_id: attr.attr_id,
            attr_value: attr.attr_selected_vals.join(',')
          }
        })
        .filter(attr => attr.attr_value.length > 0)

      // 处理商品参数
      const categoryParams = this.goodsCategoryParams.map(attr => {
        return {
          attr_id: attr.attr_id,
          attr_value: attr.attr_vals
        }
      })

      // 将商品属性和商品参数合并为一个数组提交给接口
      const attrs = [...categoryAttrs, ...categoryParams]

      // 处理商品的图片
      const pics = this.fileList.map(item => {
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname // 图片的服务端访问路径
        }
      })

      const { data, meta } = await addGoods({
        goods_name,
        goods_cat: goods_cat.join(','), // 接口要求商品分类传递一个以 , 分割的字符串列表
        goods_price,
        goods_number,
        goods_weight,
        attrs,
        pics,
        goods_introduce
      })

      if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },

    /**
     * 标签页改变处理
     */
    handleTabChange (currentTab) {
      const { label } = currentTab
      if (label === '商品参数' || label === '商品属性') {
        // 根据在第一个 tab 选中的分类 id 动态请求加载商品参数
        const { goods_cat } = this.formData
        if (goods_cat.length === 0) {
          return this.$message({
            type: 'warning',
            message: '请选择商品分类'
          })
        }
      }

      if (currentTab.label === '商品参数') {
        // 如果用户选择了商品分类，则动态就加载分类参数
        this.loadGoodsCategoryAttrs()
      } else if (currentTab.label === '商品属性') {
        this.loadGoodsCategoryParams()
      }
    },

    /**
     * 加载商品属性
     */
    async loadGoodsCategoryAttrs () {
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1])
      if (meta.status === 200) {
        data.forEach(attr => {
          attr.attr_selected_vals = attr.attr_vals.split(',')
        })
        this.goodsCategoryAttrs = data
      }
    },

    /**
     * 加载商品参数
     */
    async loadGoodsCategoryParams () {
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1], 'only')
      if (meta.status === 200) {
        this.goodsCategoryParams = data
      }
    },

    /**
     * 图片上传成功处理函数
     * response 是上传请求的响应结果数据
     * file 是上传的那个文件的信息对象
     * fileList 是存储文件信息的列表数据
     */
    handleUploadSuccess (response, file, fileList) {
      console.log('response => ', response)
      console.log('file => ', file)
      console.log('fileList => ', fileList)

      // fileList 用于默认被展示的图片列表
      // 我们将上传成功的图片信息存储到这个数组中
      // 之后需要提交给添加商品接口
      this.fileList.push({
        name: file.name, // 接口要求名字叫 pic
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}

.attr-row {
  margin-bottom: 15px;
}
</style>
