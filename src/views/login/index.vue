<!-- @format -->

<template>
  <div class="login-page">
    <div class="container">
      <div class="login-bg">
        <img :src="image.login" alt="" />
      </div>
      <div class="triangle"></div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">WELCOME BACK</h3>
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            name="email"
            type="text"
            auto-complete="on"
            placeholder="邮箱"
          />
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
        <div class="login-btn" @click.prevent="handleLogin">登录</div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace, State, Action } from 'vuex-class'
import { ActionMethod } from 'vuex'
import { Route } from 'vue-router'
import { Form as ElForm } from 'element-ui'
import loginBg from '@/assets/login-bg.jpg'

const user = namespace('user')

@Component
export default class Login extends Vue {
  @user.Action
  login: ActionMethod

  image = {
    login: loginBg
  }

  private loginForm = {
    email: '',
    password: ''
  }
  private loginRules = {
    email: [{ required: true, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur' }]
  }
  private loading = false

  private handleLogin() {
    let loginFormRef = this.$refs.loginForm as ElForm
    loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          await this.login({
            email: this.loginForm.email,
            password: this.loginForm.password
          })
          let redirect =
            this.$route.query && (this.$route.query.redirect as string)
          this.$router.push({ path: redirect || '/' })
        } catch (err) {
          this.$message.error(err)
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
.login-page {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #1a203a;

  .container {
    width: 800px;
    height: 400px;
    border-radius: 10px;
    background: #feba34;
    margin: 200px auto;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .login-bg {
    width: 300px;
    height: 400px;
    background: #fff;
    padding-top: 80px;
    padding-left: 20px;
    img {
      width: 100%;
      height: auto;
    }
  }

  .triangle {
    width: 0;
    height: 0;
    border-top: 400px solid #fff;
    border-right: 50px solid transparent;
  }

  .login-form {
    width: 300px;
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-left: 70px;
  }

  .title {
    font-size: 24px;
    font-weight: 400;
    color: #feba34;
    margin: 0px auto 22px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-btn {
    background: #1a203a;
    color: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
