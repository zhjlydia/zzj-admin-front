<template>
  <div
    v-if="value"
    :class="{shadow}"
    class="container image-panel"
    :style="{width, height}"
  >
    <img
      :alt="alt"
      :src="thumb"
      class="thumb"
      :style="{objectFit: fit}"
    >
    <i class="el-icon-video-play icon-overlay"></i>
  </div>
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

  get thumb() {
    return this.value ? this.value + '?x-oss-process=video/snapshot,t_3000,f_jpg,w_128,h_0,m_fast,ar_auto' : null
  }
}
</script>
<style lang="less" scoped>
@import '../style.less';
.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.container {
  position: relative;
}
.thumb {
  width: 100%;
  height: 100%;
}
.icon-overlay {
  display: block;
  position: absolute;
  font-size: 64px;
  left: 50%;
  top: 50%;
  opacity: 0.5;
  color: white;
  transform: translate(-50%, -50%);
}
</style>