<template>
  <div class="palatte">
    <div
      class="color"
      :style="{backgroundColor: value}"
    ></div>
    {{value}}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string
}
</script>
<style lang="less" scoped>
.palatte {
  display: flex;
  align-items: center;
}
.color {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #eee;
  margin-right: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>