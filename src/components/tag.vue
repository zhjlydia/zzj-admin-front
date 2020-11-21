<!-- @format -->

<template>
  <div class="tag" :style="styles">
    <slot />
  </div>
</template>
<script lang="ts">
/** @format */

import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { COLOR_ARRAY } from '@/common/constant'

@Component
export default class ListItem extends Vue {
  @Prop()
  color: string

  @Prop()
  selected: boolean

  get styles() {
    return {
      backgroundColor: this.selected ? this.color : 'transparent',
      color: this.selected ? '#000' : '#fff',
      borderColor: this.selected ? '#000' : '#fff'
    }
  }
}
</script>
<style lang="less" scoped>
.tag {
  padding: 0 8px;
  border-radius: 22px;
  border-width: 1px;
  margin-right: 5px;
  height: 22px;
  line-height: 20px;
  border: 1px solid #000;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 5px;
  font-size: 12px;
}
</style>
