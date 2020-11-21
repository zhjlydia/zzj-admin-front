<template>
  <div>
    <tag
      v-for="(item, i) in value"
      :key="i"
      :color="getColor(i)"
      :selected="true"
      >{{ getText(item) }}
    </tag>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import tag from '@/components/tag.vue'
import { COLOR_ARRAY } from '@/common/constant'

interface Option {
  value: string
  label?: string
}

@Component({ components: { tag } })
export default class extends Vue {
  @Prop({
    type: Array
  })
  value: string[] | number[]

  @Prop({
    type: Array
  })
  options: Option[]

  getText(value: string | number) {
    if (value == null || !this.options || !this.options.length) {
      return value
    }
    const item = this.options.find(o => o.value === value)
    return item && item.label != null ? item.label : value
  }

  getColor(i: number) {
    let index = i % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }
}
</script>
