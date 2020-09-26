<template>
  <el-upload
    action="/api/v1/Common/UploadFile"
    :data="params"
    :accept="accept"
    :show-file-list="false"
    :on-success="onSuccess"
    class="upload-image image-panel"
  >
    <img
      v-if="value"
      :src="value"
      class="thumb"
    >
    <i
      v-else
      class="el-icon-plus"
    ></i>
  </el-upload>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string

  @Prop({
    type: String,
    default: 'managed'
  })
  folder: string

  @Prop({
    type: String,
    default: 'image/*'
  })
  accept: string

  get params() {
    return { folderName: this.folder }
  }

  @Emit('input')
  onSuccess(res: any) {
    if (res.code) {
      this.$notify.error(res.message)
      throw new Error(res.message)
    }
    return res.data
  }
}
</script>
<style lang="less" scoped>
@import '../style.less';
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.thumb {
  width: 128px;
  height: 128px;
  object-fit: contain;
}
</style>