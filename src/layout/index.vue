<!-- @format -->

<template>
  <div>
    <nav-bar></nav-bar>
    <appMain />
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import navBar from '@/layout/components/navbar/index.vue'
import appMain from '@/layout/components/appmain/index.vue'

@Component({components: {navBar, appMain}})
export default class LayOut extends Vue {}
</script>
