<template>
<div>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航组件 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /面包屑路径导航组件 -->
    </div>

    <!-- 操作选项 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="请输入内容"
          v-model="searchText">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- /操作选项 -->

    <!-- /卡片头部 -->
    <!-- 卡片内容 -->

    <!--
      表格组件
      data 是表格的数据
      stripe 斑马纹
      border 带边框
      el-table-column 表格列组件
        你只需要设计表格列：列名+列值
        label 列名
        prop 数据名
        width 列宽，默认 px
      它内部会自动去遍历 data 数据，循环生成表格列
      v-loading 是 element-ui 扩展的一个自定义指令，用于添加 loading 加载效果
    -->
    <el-table
      :data="users"
      stripe
      border
      v-loading="tableLoading"
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="handleChangeState(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!--
        自定义表格列
        1. 自定义内容写到 <template slot-scope="scope"></template>
           slot-scope 是固定的属性
           值 "scope" 是随便起的一个名字
           在 template 中，scope.row 用于获取当前遍历项（item）
           scope.$index 就是遍历的索引
       -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.userEditEl.showEditDialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="success" icon="el-icon-check" size="mini">分类角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格组件 -->
  </el-card>

  <!--
  添加用户对话框
  title 对话框标题
  visible 布尔值，对话框是否显示
  -->
  <el-dialog
    title="添加用户"
    :visible.sync="addFormVisible"
    width="40%">
    <el-form
      :model="addFromData"
      size="mini"
      label-position="left"
      ref="addFormEl"
      :rules="addFormRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="addFromData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="addFromData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="addFromData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="addFromData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleAdd">确 定</el-button>
    </div>
  </el-dialog>
  <!-- /添加用户对话框 -->

  <!-- 编辑用户对话框 -->
  <!--
    1. 为组件添加一个 ref 属性，起个名字
    2. 然后就可以在当前组件中通过 this.$refs.组件的ref名字 来访问到这个组件了
    this.$refs.userEditEl 可以直接访问到 UserEdit 组件
   -->
  <UserEdit ref="userEditEl" v-on:edit-success="loadUsers"></UserEdit>
  <!-- /编辑用户对话框 -->
</div>
</template>

<script>
// import { getUserList, addUser } from '@/api/user'
import * as User from '@/api/user'
import UserEdit from './edit'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      searchText: '',
      addFormVisible: false, // 对话框是否显示
      addFromData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      tableLoading: true,
      addFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    console.log('2. token 存在，进入了具体的业务组件')
    // 除了登录接口，其它接口都需要身份令牌才能访问
    // 所有需要授权（提供 token）的接口都需要像下面这样来写
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      this.tableLoading = true // 开始加载 loading 效果
      const { data } = await User.getUserList({ pagenum: 1, pagesize: 100 })
      this.users = data.users
      this.tableLoading = false // 取消 loading 效果
    },
    handleAdd () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) { // 验证失败，什么都不做
          return
        }
        this.submitAdd() // 验证通过，提交表单
      })
    },
    async submitAdd () {
      const { meta } = await User.addUser(this.addFromData)
      if (meta.status === 201) {
        this.$refs.addFormEl.resetFields() // 清空表单数据
        this.addFormVisible = false // 隐藏对话框
        this.loadUsers() // 重新加载用户数据列表
      }
    },

    handleEdit () {},

    handleDelete (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 确认
        const { data, meta } = await User.deleteById(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.loadUsers()
        }
      }).catch((err) => { // 取消
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async handleChangeState (item) {
      const { meta, data } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用' }用户状态成功`
        })
      }
    }
  },
  components: {
    UserEdit
  }
}
</script>

<style scoped>
.el-card {
  height: 100%;
}

.el-table {
  margin-top: 15px;
}
</style>
