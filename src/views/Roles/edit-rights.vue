<template>
<el-dialog title="角色授权" :visible.sync="dialogFormVisible">
  <!--
    tree 组件
    data 数据
    show-checkbox 是否显式复选框
    node-key 用来指定数据中唯一的标识字段
    default-expanded-keys 默认展开的节点 id
    default-checked-keys 默认选中的节点
    props

    :default-expanded-keys="[2, 3, 4]"
    :default-checked-keys="[5]"
   -->
  <el-tree
    :data="rights"
    show-checkbox
    default-expand-all
    node-key="id"
    :props="defaultProps">
  </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { getRightsList } from '@/api/rights'

export default {
  name: 'RoleEditRights',
  data () {
    return {
      dialogFormVisible: false,
      rights: [],
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children', // 告诉 tree 你的数据中哪个字段是子节点数组
        label: 'authName' // 告诉 tree 你的数据中哪个字段是节点的文本
      }
    }
  },
  methods: {
    showDialog () {
      this.dialogFormVisible = true
      this.loadRights()
    },

    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },

    async handleSubmit () {
    }
  }
}
</script>

<style>
</style>
