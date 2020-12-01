<template>
  <el-select
    :value="safeValue"
    @input="input"
    filterable
    allow-create
    size="small"
    :placeholder="placeholder"
  >
    <el-option
      v-for="(item, i) in options"
      :key="i"
      :label="item.label || item.value"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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
    type: String,
    default: '请选择'
  })
  placeholder: string

  @Prop({
    type: Array
  })
  options: Option[]

  get safeValue() {
    return this.value || ''
  }

  @Emit()
  input(e) {
    return e
  }
}
</script>
