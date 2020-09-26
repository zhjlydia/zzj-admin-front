<template>
  <div
    class="object-container"
    :class="{border}"
  >
    <div
      v-for="(row, i) in rows"
      :key="i"
      v-show="!row.isHidden"
      class="prop-row"
    >
      <div
        class="prop-name"
      >{{row.name}}</div>
      <div
        class="prop-value"
      >
        <router-link
          v-if="row.router"
          :to="row.router"
        >
          <component
            :is="'plain-value'"
            v-bind="row.options"
            :value="row.value"
          />
        </router-link>
        <template v-else>
          <component
            v-if="row.array"
            :is="'array-value'"
            v-bind="row.options"
            :item-type="row.viewComp"
            :item-props="row.props"
            :value="row.value"
            :depth="depth"
          />
          <component
            v-else
            :is="row.viewComp"
            v-bind="row.options"
            :props="row.props"
            :value="row.value"
            :depth="depth"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import components, { viewMap, editMap } from '../components'
import { Row, Property } from '../types'

@Component({
  components
})
export default class extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  props: Property[]

  @Prop({
    type: Object
  })
  value: Record<string, any>

  @Prop({
    type: Boolean,
    default: true
  })
  border: boolean

  @Prop({
    type: Number,
    default: 0
  })
  depth: number

  @Prop({
    type: Boolean
  })
  strict: boolean

  get rows(): Row[] {
    const { props } = this
    let { value } = this
    if (!props || !props.length) {
      return []
    }
    if (value == null) {
      if (this.strict) {
        return []
      }
      value = {}
    }
    return props.map(p => ({
      ...p,
      value: p.deserializer ? p.deserializer.call(null, value[p.key]) : value[p.key],
      viewComp: viewMap[p.type],
      editComp: editMap[p.type],
      isHidden: typeof p.hidden === 'function' ? p.hidden.call(null, value) : p.hidden
    }))
  }
}
</script>
<style lang="less" scoped>
.object-container.border {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  padding: 8px;
  width: 100%;
}
.prop-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 8px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  .prop-name {
    font-weight: bold;
    margin-right: 20px;
    width: 100px;
    flex-shrink: 0;
  }
  .prop-value {
    flex-grow: 1;
  }
  a {
    color: #409eff;
    font-weight: bold;
    display: inline-block;
    &:hover {
      color: #66b1ff;
      text-decoration: underline;
    }
  }
}
</style>