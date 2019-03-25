<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="fomrVisible"
    width="40%">
    <el-form
      :model="editForm"
      size="mini"
      label-position="left"
      ref="addFormEl"
      :rules="formRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserEdit',
  data () {
    return {
      fomrVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile : ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit () {
    }
  }
}
</script>

<style>
</style>
