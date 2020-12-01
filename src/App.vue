<!-- @format -->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
/** @format */

import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>
<style lang="less">
/** @format */

body {
  background: #1a203a;
  margin: 0;
  padding: 0;
}
</style>
