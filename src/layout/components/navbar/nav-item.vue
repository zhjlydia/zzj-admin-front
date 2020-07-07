<!-- @format -->

<template>
  <el-menu-item v-if="onlyChild && (!item.meta || !item.meta.hidden)" :index="resolvePath(onlyChild.path)">
    <router-link class="router-link" slot="title" :to="resolvePath(onlyChild.path)">
      <i v-if="onlyChild.meta.icon" class="nav-icon" :class="'el-icon-' + onlyChild.meta.icon"></i>
      <span v-if="onlyChild.meta.title">{{ onlyChild.meta.title }}</span>
    </router-link>
  </el-menu-item>

  <el-submenu v-else-if="!item.meta || !item.meta.hidden" :index="resolvePath(item.path)" popper-append-to-body>
    <template slot="title">
      <i v-if="item.meta.icon" class="nav-icon" :class="'el-icon-' + item.meta.icon"></i>
      <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children">
      <nav-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-first-level="false"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </el-submenu>
</template>
<script lang="ts">
/** @format */

import {Component, Vue, Prop} from 'vue-property-decorator'
import {RouteConfig} from 'vue-router'
import {constantRoutes} from '@/router/routers'

@Component({name: 'nav-item', components: {}})
export default class NavBar extends Vue {
  @Prop({required: true}) private item!: RouteConfig
  @Prop({default: ''}) private basePath!: string

  get onlyChild() {
    if (this.item.children) {
      const showingChildrens = this.item.children.filter(item => {
        return !!(!item.meta || !item.meta.hidden)
      })
      return showingChildrens.length === 1 ? showingChildrens[0] : null
    } else {
      return {...this.item, path: ''}
    }
  }

  private resolvePath(routePath: string) {
    console.log(this.basePath, routePath)
    return (this.basePath === '/' ? '' : this.basePath) + (routePath ? '/' : '') + routePath
  }
}
</script>
<style lang="less" scoped>
/** @format */

.nav-icon {
  color: #fff;
  font-size: 24px;
  display: block;
  margin-bottom: 10px;
  text-align: center;
}
.router-link {
  width: 100%;
  height: 100%;
  display: block;
  color: #fff;
  text-decoration: none;
}
</style>
