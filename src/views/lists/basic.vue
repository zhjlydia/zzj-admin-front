<template>
  <el-container>
    <el-header height="33px">
      <div style="overflow: hidden">
        <el-tooltip v-if="allowCreate" content="创建新条目">
          <el-button
            round
            plain
            icon="el-icon-plus"
            size="small"
            type="primary"
            style="float: right"
            @click="onAdd"
          ></el-button>
        </el-tooltip>
      </div>
    </el-header>
    <el-main>
      <div class="basic-table">
        <el-table
          style="width: 100%"
          :data="items"
          v-if="items && items.length"
          @row-click="detail"
        >
          <slot></slot>
          <el-table-column width="150">
            <div slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-edit"
                size="mini"
                circle
                plain
                @click.stop="edit(scope.row.id)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                size="mini"
                circle
                plain
                @click.stop="del(scope.row.id)"
              ></el-button>
            </div>
          </el-table-column>
        </el-table>
        <model-drawer
          :model="model"
          :id="selected"
          :mode="mode"
          @close="onClose"
        />
      </div>
    </el-main>
    <el-footer>
      <div class="pagination">
        <el-pagination
          @size-change="resize"
          hide-on-single-page
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-size="size"
          :page-sizes="[10, 20, 30, 50]"
          :current-page="index"
          @current-change="jump"
        >
        </el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { mapState, mapGetters, mapActions, ActionMethod } from 'vuex'
import { Loading, Catch, Debounce } from '@/plugins/decorators'
import ModelDrawer from '../drawer.vue'

@Component({
  components: { ModelDrawer },
  computed: mapState({
    items(state) {
      return state[this.namespace].items
    },
    size(state) {
      return state[this.namespace].size
    },
    index(state, getters) {
      return getters[this.namespace + '/index']
    },
    total(state, getters) {
      return getters[this.namespace + '/total']
    }
  }),
  methods: mapActions({
    reset: Loading.wrap(
      Catch.wrap(function (this: any, dispatch, payload) {
        console.log('reset')
        return dispatch(this.namespace + '/reset', payload)
      })
    ),
    list: Loading.wrap(
      Catch.wrap(function (this: any, dispatch, payload) {
        return dispatch(this.namespace + '/list', payload)
      })
    ),
    remove: Loading.wrap(
      Catch.wrap(function (this: any, dispatch, payload) {
        return dispatch(this.namespace + '/remove', payload)
      })
    ),
    jump: Loading.wrap(
      Catch.wrap(function (this: any, dispatch, payload) {
        return dispatch(this.namespace + '/jump', payload)
      })
    ),
    resize: Loading.wrap(
      Catch.wrap(function (this: any, dispatch, payload) {
        return dispatch(this.namespace + '/resize', payload)
      })
    )
  })
})
export default class extends Vue {
  private namespace: string
  private readonly items: any[]
  private readonly size: number
  private readonly index: number
  private readonly total: number
  private readonly reset: ActionMethod
  private readonly list: ActionMethod
  private readonly remove: ActionMethod
  private readonly jump: ActionMethod

  private selected: string | number = null
  private mode: 'add' | 'edit' | 'view' = 'view'

  @Prop({
    type: String,
    required: true
  })
  model: string

  @Prop({
    type: String
  })
  module: string

  @Prop({ type: Boolean })
  allowCreate: boolean

  created() {
    this.namespace = this.model
  }

  async mounted() {
    await this.list()
  }

  destroyed() {
    this.reset()
  }

  onAdd() {
    this.selected = 0
    this.mode = 'add'
  }

  onClose() {
    this.selected = null
    this.mode = null
    return this.list()
  }

  detail(row: any) {
    this.selected = row.id
    this.mode = 'view'
  }

  edit(id: number) {
    this.selected = id
    this.mode = 'edit'
  }
  del(id: number) {
    this.remove(id)
  }
}
</script>
<style lang="less" scoped>
.basic-table::v-deep {
  padding: 0 20px 20px 20px;
  background: #486177;
  a {
    color: #409eff;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: #66b1ff;
      text-decoration: underline;
    }
  }
}
</style>
