<template>
  <div>
    <component
      :is="'object-field'"
      v-bind="options"
      :border="false"
      :props="props"
      :value="value"
      :depth="depth"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import components from '../components'
import { Row, Property } from '../types'

@Component({
  components
})
export default class extends Vue {
  @Prop({
    type: Object
  })
  value: Record<string, any>

  @Prop({
    type: Array,
    required: true
  })
  props: Property[]

  @Prop({
    type: String
  })
  json: string

  @Prop({
    type: Object
  })
  options: Record<string, any>

  @Prop({
    type: Number
  })
  depth: number

  @Emit('json-input')
  onJsonInput(text: string) {
    return text
  }

  @Emit('input')
  onInput(e: object) {
    return e
  }
}
</script>