<template>
  <div
    v-if="value && value.length"
    class="array-container"
  >
    <el-row
      v-for="(item, i) in value"
      :key="i"
      class="array-item"
    >
      <component
        :is="itemType"
        v-bind="itemOptions"
        :value="item"
        :depth="depth"
        :props="itemProps"
      />
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import components from '../components'

@Component({
  components
})
export default class extends Vue {
  @Prop({
    type: String,
    required: true
  })
  itemType: string

  @Prop({
    type: Array
  })
  value: any[]

  @Prop({
    type: Array
  })
  itemProps: any[]

  @Prop({
    type: Object
  })
  itemOptions: Record<string, any>

  @Prop({
    type: Number
  })
  depth: number
}
</script>
<style lang="less" scoped>
.array-container {
  position: relative;
  box-sizing: border-box;
  padding-left: 16px;
  &::before {
    position: absolute;
    left: 0;
    display: block;
    content: '';
    border: 1px dashed #eee;
    border-right: none;
    width: 16px;
    height: 100%;
    box-sizing: border-box;
  }
}
.array-item {
  &:not(:last-child) {
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
}
</style>