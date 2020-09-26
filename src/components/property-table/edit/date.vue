<template>
  <el-date-picker
    type="datetime"
    placeholder="选择日期时间"
    :value="safeValue"
    @input="input"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  value: Date | string | number

  get safeValue() {
    return this.value || ''
  }

  @Emit()
  input(e) {
    return e
  }
}
</script>