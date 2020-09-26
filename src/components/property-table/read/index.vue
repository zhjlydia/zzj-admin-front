<template>
  <div>
    <component
      :is="'object-value'"
      v-bind="options"
      :border="false"
      :props="props"
      :value="value"
      :depth="depth"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import components from '../components'
import { Property } from '../types'

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
    type: Number
  })
  depth: number

  @Prop({
    type: Object
  })
  options: Record<string, any>
}
</script>