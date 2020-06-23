<!-- @format -->

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">
        登录
      </h3>
      <el-form-item prop="email">
        <el-input v-model="loginForm.email" name="email" type="text" auto-complete="on" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
import {Route} from 'vue-router'
import {Form as ElForm} from 'element-ui'

const user = namespace('user')

@Component
export default class Login extends Vue {
  @user.Action
  login: ActionMethod

  private loginForm = {
    email: '',
    password: ''
  }
  private loginRules = {
    email: [{required: true, trigger: 'blur'}],
    password: [{required: true, trigger: 'blur'}]
  }
  private loading = false

  private handleLogin() {
    let loginFormRef = this.$refs.loginForm as ElForm
    loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          console.log(this.loginForm)
          await this.login({email: this.loginForm.email, password: this.loginForm.password})
          let redirect = this.$route.query && (this.$route.query.redirect as string)
          this.$router.push({path: redirect || '/'})
        } catch (err) {
          console.log(err)
          //   this.$message.error(err)
        }
        this.loading = false
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(160deg, #7075a9 20%, #deb6d8 60%, #80cbe1 100%);

  .login-form {
    width: 420px;
    padding: 30px;
    margin: 200px auto;
    background: #fff;
    box-shadow: 2px 2px 20px #312d58;
    border-radius: 10px;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: #2d3d54;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
