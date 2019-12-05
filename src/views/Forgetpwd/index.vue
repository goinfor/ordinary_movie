<template>
    <div class="login-container">
      <Header title="登录"/>
      <form action="">
        <mt-field placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field placeholder="请输入密码" v-model="password"></mt-field>
        <mt-button type="danger" size="large">登录</mt-button>
        <router-link to="/register">立即注册</router-link>
        <router-link to="/forgetpwd">找回密码</router-link>
      </form>
    </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    components: {
      Header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
