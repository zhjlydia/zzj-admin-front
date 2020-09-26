<template>
  <el-image
    v-if="value"
    lazy
    :style="{width, height}"
    :fit="fit"
    :alt="alt"
    :src="value"
    :preview-src-list="[value]"
    :class="{shadow}"
    class="image-panel"
  />
  <div v-else></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string

  @Prop({
    type: String,
    default: '128px'
  })
  width: string

  @Prop({
    type: String,
    default: '128px'
  })
  height: string

  @Prop({
    type: String,
    default: 'contain'
  })
  fit: string

  @Prop({
    type: String
  })
  alt: string

  @Prop({
    type: Boolean,
    default: true
  })
  shadow: boolean
}
</script>
<style lang="less" scoped>
@import '../style.less';

.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>