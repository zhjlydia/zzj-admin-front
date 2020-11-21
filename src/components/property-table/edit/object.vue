<template>
  <div class="object-container" :class="{ border }">
    <div
      v-for="(row, i) in rows"
      :key="i"
      v-show="!row.isHidden"
      class="prop-row"
    >
      <div class="prop-name">{{ row.name }}</div>
      <div class="prop-value">
        <template v-if="row.readonly">
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
        <template v-else>
          <component
            v-if="row.array"
            :is="'array-field'"
            v-bind="row.options"
            :item-type="row.editComp"
            :item-props="row.props"
            :value="row.value"
            :depth="depth"
            @input="onInput(row, $event)"
          />
          <component
            v-else
            :is="row.editComp"
            v-bind="row.options"
            :props="row.props"
            :value="row.value"
            :depth="depth"
            @input="onInput(row, $event)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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
      value: p.deserializer
        ? p.deserializer.call(null, value[p.key])
        : value[p.key],
      viewComp: viewMap[p.type],
      editComp: editMap[p.type],
      isHidden:
        typeof p.hidden === 'function' ? p.hidden.call(null, value) : p.hidden
    }))
  }

  @Emit('input')
  onInput(row: Row, value: any) {
    if (row.serializer) {
      value = row.serializer.call(null, value, (this.value || {})[row.key])
    }
    return {
      ...(this.value || {}),
      [row.key]: value
    }
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
