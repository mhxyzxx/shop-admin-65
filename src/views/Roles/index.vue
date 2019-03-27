/**
 * 1. 在 views 中创建视图组件
 * 2. 在 router 中配置路由导航
 * 3. 使用 element 布局
 * 4. 编写 api 请求函数
 * 5. 调用请求函数，按到结果，渲染到页面中
 */
<template>
<div>
  <el-row>
    <el-col :span="4">
      <el-button type="primary">添加角色</el-button>
    </el-col>
  </el-row>

  <!-- 角色列表 -->
  <el-table
    :data="roles"
    border
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        hello world
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="handleDelete(scope.$index, scope.row)">授权角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- /角色列表 -->
</div>
</template>

<script>
import { getRoleList } from '@/api/role'

export default {
  name: 'RolesList',
  data () {
    return {
      roles: []
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      const { data, meta } = await getRoleList()
      if (meta.status === 200) {
        this.roles = data
      }
    },
    handleEdit () {},
    handleDelete () {},
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
