<!-- @format -->

<template>
  <div>
    <nav-bar
      :name="user ? user.username : ''"
      :head="user ? user.image : ''"
      @logout="logoutMethod"
    ></nav-bar>
    <appMain />
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
import navBar from '@/layout/components/navbar/index.vue'
import appMain from '@/layout/components/appmain/index.vue'
import User from '@/model/user'

import {Catch} from '@/plugins/decorators'

const user = namespace('user')

@Component({components: {navBar, appMain}})
export default class LayOut extends Vue {
  @user.State
  user: User

  @user.Action
  logout: ActionMethod

  @Catch
  async logoutMethod() {
    await this.logout()
    this.$router.replace({name: 'Login'})
  }
}
</script>
