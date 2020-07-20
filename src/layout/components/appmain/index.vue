<!-- @format -->

<template>
  <div class="app-main">
    <transition
      name="main"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'

@Component({})
export default class AppMain extends Vue {}
</script>
<style lang="less" scoped>
/** @format */
.app-main {
  margin: 0 auto;
  padding: 120px 200px;
  min-width: 1220px;
}
</style>
