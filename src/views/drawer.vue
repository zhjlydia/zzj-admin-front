<template>
  <el-drawer :visible="id != null" direction="rtl" size="100%" class="model-drawer" @close="onClose" @opened="onOpened">
    <component v-if="id != null && ready" :is="model + '-model'" :id="id" :model="model" :mode="mode" />
  </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import models from './models'

@Component({
  components: models,
})
export default class extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  model: string

  @Prop()
  id: string | number

  @Prop()
  mode: 'add' | 'edit' |'view'

  private ready: boolean = false

  @Emit('close')
  onClose() {
    this.ready = false
  }

  onOpened() {
    this.ready = true
  }
}
</script>
<style lang="less" scoped>
.model-drawer::v-deep {
  .el-drawer {
    overflow: auto;
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
}
.title {
  font-size: 20px;
  cursor: pointer;
}
</style>
