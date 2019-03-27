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
      <!--
        这里有个大问题：调用子组件方法先必须调用一下，有问题
       -->
      <!-- <el-button type="primary" @click="handleAdd">添加角色</el-button> -->

      <!-- 模板中访问$refs成员方法，一定要调用 -->
      <!-- 官方文档说进来不要在模板中使用 $refs -->
      <!-- <el-button type="primary" @click="$refs.roleAddEl.showDialog()">添加角色</el-button> -->

      <!-- 这是 hack 的一种方式，直接给事件绑定了一个匿名箭头函数 -->
      <el-button type="primary" @click="() => this.$refs.roleAddEl.showDialog()">添加角色</el-button>
    </el-col>
  </el-row>

  <!-- 角色列表 -->
  <el-table
    :data="roles"
    border
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row class="first" v-for="first in scope.row.children" :key="first.id">
          <!-- 一级 -->
          <el-col :span="4">
            <el-tag closable>{{ first.authName }}</el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>

          <!-- 二级 -->
          <el-col :span="20">
            <el-row class="second" v-for="second in first.children" :key="second.id">
              <el-col :span="4">
                <el-tag closable type="success">{{ second.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>

              <!-- 三级 -->
              <el-col :span="20">
                <el-tag class="third" v-for="third in second.children" :key="third.id" closable type="warning">{{ third.authName }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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

  <!-- 添加角色 -->
  <RoleAdd ref="roleAddEl" @add-success="loadRoles" />
  <!-- /添加角色 -->
</div>
</template>

<script>
import { getRoleList } from '@/api/role'
import RoleAdd from './add'

export default {
  name: 'RolesList',
  components: {
    RoleAdd
  },
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
    handleAdd () {
      this.$refs.roleAddEl.showDialog()
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}

.first {
  margin-bottom: 10px;
}

.second, .third {
  margin-top: 5px;
}

.third {
  margin-right: 5px;
}
</style>
