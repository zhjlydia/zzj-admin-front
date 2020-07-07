<!-- @format -->

<template>
  <div class="tag" :style="styles">
    <slot />
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

@Component
export default class ListItem extends Vue {
  @Prop()
  color: string

  @Prop()
  selected: boolean

  get styles() {
    return {
      backgroundColor: this.selected ? this.color : 'transparent'
    }
  }
}
</script>
<style lang="less" scoped>
.tag {
  padding: 0 10px;
  border-radius: 15px;
  border-width: 1px;
  margin-right: 5px;
  height: 30px;
  line-height: 28px;
  border: 1px solid #000;
  cursor: pointer;
  color: #000;
  display: inline-block;
}
</style>
