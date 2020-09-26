<template>
  <div
    v-if="value && value.length"
    class="array-container"
  >
    <div
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
        @input="onInput(i, $event)"
      />
      <div class="menu">
        <i
          class="el-icon-plus"
          @click="onInsert(i + 1)"
        ></i>
        <i
          class="el-icon-minus"
          @click="onRemove(i)"
        ></i>
        <i
          class="el-icon-sort-down down"
          @click="onReorder(i, i + 1)"
        ></i>
        <i
          class="el-icon-sort-up up"
          @click="onReorder(i, i - 1)"
        ></i>
      </div>
    </div>
  </div>
  <div
    v-else
    class="empty-add"
    @click="onInsert(0)"
  >
    <i class="el-icon-plus"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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

  @Emit('input')
  onInput(i: number, value: any) {
    const array = Array.from(this.value || [])
    array.splice(i, 1, value)
    return array
  }

  @Emit('input')
  onInsert(i: number) {
    const array = Array.from(this.value || [])
    array.splice(i, 0, null)
    return array
  }

  @Emit('input')
  onRemove(i: number) {
    const value = Array.from(this.value || [])
    value.splice(i, 1)
    return value
  }

  @Emit('input')
  onReorder(i: number, j: number) {
    const value = Array.from(this.value || [])
    const item = value[i]
    value[i] = value[j]
    value[j] = item
    return value
  }
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
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
  .menu {
    display: none;
    align-self: center;
    & > i {
      margin-left: 4px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
  &:hover > .menu {
    display: flex;
  }
  &:first-child .menu .up {
    display: none;
  }
  &:last-child .menu .down {
    display: none;
  }
}
.empty-add {
  font-size: 18px;
  text-align: center;
  line-height: 18px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  & > i {
    margin: 10px 0;
  }
  &:hover {
    color: #409eff;
  }
}
</style>