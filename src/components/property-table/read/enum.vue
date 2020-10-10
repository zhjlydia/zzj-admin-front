<template>
  <el-tag
    v-if="text"
    effect="dark"
  >{{text}}</el-tag>
  <div v-else></div>
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
    type: [String, Number]
  })
  value: string | number

  @Prop({
    type: Array
  })
  options: Option[]

  get text() {
    if (this.value == null || !this.options || !this.options.length) {
      return this.value
    }
    const value = this.options.find(o => o.value === this.value)
    return value && value.label != null ? value.label : this.value
  }
}
</script>