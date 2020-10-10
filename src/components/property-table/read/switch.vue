<template>
  <i
    v-if="safeValue"
    class="el-icon-check"
  ></i>
  <i
    v-else
    class="el-icon-close"
  ></i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: [Boolean, Number, String]
  })
  value: boolean | number | string

  get safeValue() {
    return !!this.value
  }
}
</script>