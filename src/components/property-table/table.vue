<template>
  <div class="prop-table">
    <div class="hidden-columns">
      <slot />
    </div>
    <div class="prop-table-header" slot="header">
      <span class="title">{{ title }}</span>
    </div>
    <div class="prop-table-body">
      <component
        :is="tableBody"
        :value="context"
        :props="props"
        :json="json"
        :depth="depth"
        :options="options"
        @input="onInput"
        @json-input="onJsonInput"
      />
    </div>
    <div class="prop-table-footer">
      <slot name="footer" />
    </div>
    <div class="prop-table-menu">
      <template v-if="isEdit">
        <el-tooltip content="提交" placement="right">
          <div class="menu-item">
            <i class="el-icon-check" @click="onSubmit"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="放弃修改" placement="right">
          <div class="menu-item">
            <i class="el-icon-close" @click="onDiscard"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="上传文件" placement="right">
          <div class="menu-item">
            <el-upload
              action="/api/share/upload"
              :data="{ folderName: model }"
              :show-file-list="false"
              :on-success="uploadSuccess.bind(this)"
            >
              <i class="el-icon-picture-outline-round"></i>
            </el-upload>
          </div>
        </el-tooltip>
      </template>
      <template v-else>
        <el-tooltip v-if="allowRefresh" content="刷新" placement="right">
          <div class="menu-item">
            <i class="el-icon-refresh" @click="onRefresh"></i>
          </div>
        </el-tooltip>
        <el-tooltip v-if="allowEdit" content="编辑" placement="right">
          <div class="menu-item">
            <i class="el-icon-edit" @click="setEdit(true)"></i>
          </div>
        </el-tooltip>
        <el-tooltip v-if="allowRemove" content="删除" placement="right">
          <div class="menu-item">
            <i class="el-icon-delete" @click="onRemove"></i>
          </div>
        </el-tooltip>
      </template>
      <slot name="menu-item" :isEdit="isEdit"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import store from './store'
import { viewMap, editMap } from './components'
import { Property, Row } from './types'

let tableId = 1

@Component({
  components: {
    ViewBody: () => import('./read/index.vue'),
    EditBody: () => import('./edit/index.vue')
  }
})
export default class extends Vue {
  @Prop({ type: String })
  model: string

  @Prop({ type: String })
  title: string

  @Prop({
    type: Object
  })
  value: Record<string, any>

  @Prop({
    type: Object
  })
  options: Record<string, any>

  @Prop({ type: Boolean })
  allowRefresh: boolean

  @Prop({ type: Boolean })
  allowEdit: boolean

  @Prop({ type: Boolean })
  allowRemove: boolean

  @Prop({ type: Boolean, default: true })
  allowAdvanceMode: boolean

  @Prop({ type: Boolean })
  editMode: boolean

  tableId: number

  @store.State()
  props: Property[]

  @store.State()
  isEdit: boolean

  @store.Getter()
  depth: number

  get tableBody() {
    return this.isEdit ? 'edit-body' : 'view-body'
  }

  private store: store.Type

  private json: string = null

  private context: any = null

  @store.Mutation()
  addProp: (prop: Property) => void

  @store.Mutation()
  removeProp: (id: number) => void

  @store.Mutation()
  setEdit: (value: boolean) => void

  created() {
    this.tableId = tableId++
    this.store = store()
  }

  mounted() {
    if (this.editMode) {
      this.setEdit(true)
    }
  }

  @Watch('value', {
    immediate: true
  })
  onValueChange(value: any) {
    if (value == null) {
      this.context = null
      this.json = null
    } else {
      this.context = JSON.parse(JSON.stringify(value))
      this.json = JSON.stringify(value, null, 2)
    }
  }

  @Emit('refresh')
  onRefresh() {}

  @Emit('remove')
  onRemove() {}

  onInput(data: any) {
    this.context = data
  }

  onJsonInput(value: string) {
    this.json = value
  }

  onDiscard() {
    this.onValueChange(this.value)
    this.setEdit(false)
  }

  /**
   * 文件上传成功后的回调函数
   */
  private uploadSuccess(res: any, file: File) {
    this.$alert(res, '', {
      confirmButtonText: '确定',
      customClass: 'upload-success-modal'
    })
  }

  onSubmit() {
    this.$emit('submit', this.context)
    this.setEdit(false)
  }
}
</script>
<style lang="less" scoped>
.hidden-columns {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
.prop-table {
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 10px 30px;
  .prop-table-header {
    height: 60px;
    line-height: 60px;
    margin-bottom: 30px;
    border-bottom: 1px dashed #ccc;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    .title {
      font-weight: bold;
    }
  }
  .prop-table-menu {
    position: absolute;
    right: -40px;
    top: 100px;
    .menu-item {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 30px;
      background: #fff;
      margin-bottom: 5px;
      text-align: center;
    }
  }

  .upload-success-modal .el-message-box__message p {
    word-break: break-all !important;
  }
}
</style>
