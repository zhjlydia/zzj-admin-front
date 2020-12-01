<template>
  <div>
    <tag
      v-for="(item, i) in options"
      :key="i"
      :color="getColor(i)"
      :selected="safeValue.indexOf(item.value) !== -1"
      @click.native="select(item)"
      >{{ item.label }}</tag
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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

  get safeValue() {
    return this.value || []
  }

  @Emit('input')
  select(item: Option) {
    let value = this.safeValue
    let index = this.safeValue.findIndex(i => {
      return String(i) === String(item.value)
    })
    if (index !== -1) {
      value.splice(index, 1)
    } else {
      value.push(item.value as never)
    }
    return value
  }

  getColor(i: number) {
    let index = i % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }
}
</script>
