<template>
<el-dialog title="角色授权" :visible.sync="dialogFormVisible">
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { addRole } from '@/api/role'

export default {
  name: 'RoleAdd',
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    showDialog () {
      this.dialogFormVisible = true
    },

    async handleSubmit () {
    }
  }
}
</script>

<style>
</style>
