<template>
  <el-dialog
    title="编辑用户角色"
    :visible.sync="fomrVisible"
    width="40%">
    <el-form
      :model="editForm"
      size="mini"
      label-position="left"
      ref="FormEl"
      :rules="formRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getById as getUserById, updateById as updateUserById } from '@/api/user'

export default {
  name: 'UserEditRole',
  data () {
    return {
      fomrVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: ''
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
      this.$refs.FormEl.validate(valid => {
        if (!valid) {
          return
        }
        this.submitEdit()
      })
    },

    async submitEdit () {
      const { id, email, mobile } = this.editForm
      const { data, meta } = await updateUserById(id, {
        email,
        mobile
      })
      if (meta.status === 200) {
        this.$emit('edit-role-success')
        this.fomrVisible = false
        this.$message({
          type: 'success',
          message: '分配成功'
        })
      }
    },

    async showEditRoleDialog (item) {
      const { data, meta } = await getUserById(item.id)
      if (meta.status === 200) {
        this.editForm = data
        this.fomrVisible = true // 显式弹框
      }
    }
  }
}
</script>

<style>
</style>
