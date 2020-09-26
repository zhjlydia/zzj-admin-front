<template>
  <el-input
    :value="safeValue"
    @input="input"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  value: any

  get safeValue() {
    return this.value || ''
  }

  @Emit()
  input(e) {
    return e
  }
}
</script>