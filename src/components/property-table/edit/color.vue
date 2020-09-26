<template>
  <el-input
    :value="safeValue"
    @input="input"
    class="color-input"
  >
    <el-color-picker
      slot="append"
      show-alpha
      :value="safeValue"
      @input="input"
    />
  </el-input>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string

  get safeValue() {
    return this.value || ''
  }

  @Emit()
  input(e) {
    return e
  }
}
</script>
<style lang="less" scoped>
.color-input::v-deep {
  max-width: 230px;
  .el-input-group__append {
    border: none;
    padding: 0;
  }
  .el-color-picker__trigger {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }
}
</style>