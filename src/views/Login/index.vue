<template>
<div class="login-wrap">
  <div class="login-container"></div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .login-wrap {
    height: 100%;
    background-color: #2f4050;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    width: 500px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
  }
</style>
