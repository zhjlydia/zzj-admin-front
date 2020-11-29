<!-- @format -->

<template>
  <div class="navBar">
    <div class="bar">
      <img
        class="logo"
        src="http://cdn.zhouzhoujiang.com/blog/logo-white.png"
      />
      <div class="menu">
        <el-menu
          :default-active="activeMenu"
          background-color="#2b3153"
          text-color="#fff"
          active-text-color="#feba34"
          :collapse-transition="false"
          mode="horizontal"
          unique-opened
          menu-trigger="click"
        >
          <nav-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
      <el-dropdown @command="dropdownCommand">
        <div class="header-user">
          <span>{{ name }}</span>
          <img class="head" :src="head" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import { Component, Vue, Prop } from 'vue-property-decorator'
import { constantRoutes } from '@/router/routers'
import navItem from '@/layout/components/navbar/nav-item.vue'

@Component({ components: { navItem } })
export default class NavBar extends Vue {
  @Prop()
  name: string

  @Prop()
  head: string

  get routes() {
    return constantRoutes
  }
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    return path
  }
  dropdownCommand(command: string) {
    switch (command) {
      case 'logout':
        this.$emit('logout')
        break
      default:
        this.$emit('logout')
    }
  }
}
</script>
<style lang="less" scoped>
/** @format */

.navBar {
  height: 80px;
  background: #2b3153;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 0 200px;
  min-width: 1220px;
  .logo {
    margin-right: 40px;
    width: auto;
    height: 40px;
  }
  .menu {
    flex-grow: 1;
  }
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-user {
    color: #fff;
    display: flex;
    align-items: center;
    width: 120px;
    .head {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }
}
</style>
