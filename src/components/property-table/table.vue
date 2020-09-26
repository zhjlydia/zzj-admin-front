<template>
  <el-card
    class="prop-table"
    shadow="never"
    body-style="font-size: 14px;text-align: left;"
  >
    <div class="hidden-columns">
      <slot />
    </div>
    <div
      class="prop-table-header"
      slot="header"
    >
      <slot name="header">
        <span class="title">{{title}}</span>
        <div class="prop-table-header-menu">
          <template v-if="isEdit">
            <el-tooltip content="提交">
              <i
                class="el-icon-check"
                @click="onSubmit"
              ></i>
            </el-tooltip>
            <el-tooltip content="放弃修改">
              <i
                class="el-icon-close"
                @click="onDiscard"
              ></i>
            </el-tooltip>
          </template>
          <template v-else>
            <el-tooltip
              v-if="allowRefresh"
              content="刷新"
            >
              <i
                class="el-icon-refresh"
                @click="onRefresh"
              ></i>
            </el-tooltip>
            <el-tooltip
              v-if="allowEdit"
              content="编辑"
            >
              <i
                class="el-icon-edit"
                @click="setEdit(true)"
              ></i>
            </el-tooltip>
            <el-tooltip
              v-if="allowRemove"
              content="删除"
            >
              <i
                class="el-icon-delete"
                @click="onRemove"
              ></i>
            </el-tooltip>
          </template>
          <slot
            name="menu-item"
            :isEdit="isEdit"
          ></slot>
        </div>
      </slot>
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
  </el-card>
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
.prop-table-header {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: bold;
  }
  .prop-table-header-menu {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    & > i,
    &::v-deep .menu-button {
      cursor: pointer;
      margin: 0 12px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>