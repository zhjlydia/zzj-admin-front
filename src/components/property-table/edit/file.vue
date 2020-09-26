<template>
  <el-upload
    action="/api/v1/Common/UploadFile"
    :data="params"
    :accept="accept"
    :show-file-list="false"
    :on-success="onSuccess"
  >
    <el-link
      v-if="value"
      icon="el-icon-edit"
      :underline="false"
    >{{value}}</el-link>
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
    type: String
  })
  accept: string

  get params() {
    return { folderName: this.folder }
  }

  @Emit('input')
  onSuccess(res: any) {
    return res.data
  }
}
</script>