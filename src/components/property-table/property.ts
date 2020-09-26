import { Vue, Component, Prop } from 'vue-property-decorator'
import { Property } from './types'

let propId = 1

@Component({
  template: '<div><slot/></div>'
})
export default class extends Vue {
  propId: number

  props: Property[]

  @Prop({
    type: String,
    required: true
  })
  prop: string

  @Prop({
    type: String
  })
  name: string

  @Prop({
    type: String
  })
  type: Property.Type

  @Prop({
    type: Boolean
  })
  array?: boolean

  @Prop({
    type: Boolean
  })
  readonly?: boolean

  @Prop({
    type: [Boolean, Function]
  })
  hidden?: boolean | ((value?: any) => any)

  @Prop()
  serializer?: Property.Serializer

  @Prop()
  deserializer?: Property.Deserializer

  @Prop()
  router?: Property.Router

  @Prop({
    type: Object
  })
  options?: Record<string, any>

  addProp(prop: Property) {
    if (!this.props) {
      this.props = []
    }
    this.props.push(prop)
  }

  removeProp(id: number) {
    if (this.props) {
      const index = this.props.findIndex(e => e.id === id)
      if (index >= 0) {
        this.props.splice(index, 1)
      }
    }
  }

  created() {
    this.propId = propId++
  }

  destroyed() {
    let parent: any = this.$parent
    while (parent) {
      if (parent.tableId) {
        parent.removeProp(this.propId)
        break
      }
      if (parent.propId) {
        parent.removeProp(this.propId)
        break
      }
      parent = parent.$parent
    }
  }

  mounted() {
    const prop: Property = {
      id: this.propId,
      key: this.prop,
      name: this.name || this.prop,
      type: this.type || 'string',
      readonly: this.readonly,
      hidden: this.hidden,
      serializer: this.serializer,
      deserializer: this.deserializer,
      router: this.router,
      array: this.array,
      options: this.options,
      props: this.props
    }
    let parent: any = this.$parent
    while (parent) {
      if (parent.tableId) {
        parent.addProp(prop)
        break
      }
      if (parent.propId) {
        parent.addProp(prop)
        break
      }
      parent = parent.$parent
    }
  }
}
