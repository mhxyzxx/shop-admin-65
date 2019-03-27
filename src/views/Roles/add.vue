<template>
<el-dialog title="添加角色" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="角色名称" label-width="80px">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" label-width="80px">
      <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  name: 'RoleAdd',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    showDialog () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
</style>
