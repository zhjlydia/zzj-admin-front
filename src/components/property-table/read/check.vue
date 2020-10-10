<template>
<div>
  <el-tag v-for="(item,i) in value" :key="i" style="margin-right:10px"
  >{{getText(item)}}</el-tag>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
interface Option {
  value: string
  label?: string
}

@Component
export default class extends Vue {
  @Prop({
    type: Array
  })
  value: string[] | number[]

  @Prop({
    type: Array
  })
  options: Option[]

  getText(value:string|number) {
    if (value == null || !this.options || !this.options.length) {
      return value
    }
    const item = this.options.find(o => o.value === value)
    return item && item.label != null ? item.label : value
  }
}
</script>