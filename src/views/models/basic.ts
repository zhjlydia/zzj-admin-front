import { Catch, Loading } from '@/plugins/decorators'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ActionMethod, mapActions, mapState } from 'vuex'

@Component({
  computed: mapState({
    item(state) {
      return state[this.namespace].current
    }
  }),
  methods: mapActions({
    get(dispatch, payload) {
      return dispatch(this.namespace + '/get', payload)
    },
    reset(dispatch, payload) {
      return dispatch(this.namespace + '/resetCurrent', payload)
    },
    add: Loading.wrap(
      Catch.wrap(function(this: any, dispatch, payload) {
        return dispatch(this.namespace + '/add', payload)
      })
    ),
    draft: Catch.wrap(function(this: any, dispatch, payload) {
        return dispatch(this.namespace + '/draft', payload)
    }),
    update: Loading.wrap(
      Catch.wrap(function(this: any, dispatch, payload) {
        return dispatch(this.namespace + '/update', payload)
      })
    ),
    remove: Loading.wrap(
      Catch.wrap(function(this: any, dispatch, payload) {
        return dispatch(this.namespace + '/remove', payload)
      })
    )
  })
})
export default class<T> extends Vue {
  @Prop({
    type: String,
    required: true
  })
  model: string

  @Prop({
    type: [String, Number],
    required: true
  })
  id: string | number

  @Prop()
  mode: 'add' | 'edit' |'view'

  protected readonly modelName: string = '对象'
  protected readonly item: T
  protected readonly get: ActionMethod
  protected readonly reset: ActionMethod
  protected readonly draft: ActionMethod
  protected readonly add: ActionMethod
  protected readonly update: ActionMethod
  protected readonly remove: ActionMethod

  protected namespace: string

  get title() {
    const { id } = this.item || ({} as any)
    return id == null ? '创建' + this.modelName : `${this.modelName}`
  }

  get isNew() {
    return this.mode === 'add'
  }

  created() {
    if (!this.namespace) {
      this.namespace = this.model
    }
  }

  mounted() {
    this.reload()
  }

  destroyed() {
    this.reset()
  }

  @Loading
  @Catch
  async reload() {
    if (this.isNew) {
      await this.draft()
    } else {
      await this.get(this.id)
    }
  }

  @Loading
  @Catch
  submit(data: T) {
    if (!data) {
      return
    }
    if (this.isNew) {
      return this.add(data)
    }
    return this.update(data)
  }

  onJsonError(error: Error) {
    this.$notify.error('JSON格式错误: ' + error.message)
  }
}
