<!-- @format -->

<template>
  <div class="navBar">
    <div class="bar">
      <div class="logo">Product Admin</div>
      <div class="menu">
        <el-menu
          :default-active="activeMenu"
          background-color="#566f86"
          text-color="#fff"
          active-text-color="#ffc107"
          :collapse-transition="false"
          mode="horizontal"
          menu-trigger="click"
          unique-opened
        >
          <nav-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {constantRoutes} from '@/router/routers'
import navItem from '@/layout/components/navbar/nav-item.vue'

@Component({components: {navItem}})
export default class NavBar extends Vue {
  current: string[] = ['mail']
  get routes() {
    return constantRoutes
  }
  get activeMenu() {
    const route = this.$route
    const {meta, path} = route
    return path
  }
}
</script>
<style lang="less" scoped>
/** @format */

.navBar {
  height: 80px;
  background: #566f86;
  width: 100%;
  .logo {
    height: 80px;
    margin-right: 20px;
    font-size: 32px;
    line-height: 90px;
    text-align: center;
    color: #fff;
  }
  .bar {
    width: 1336px;
    padding: 0 50px;
    margin: 0 auto;
    display: flex;
  }
}
</style>
