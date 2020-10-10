<template>
    <el-checkbox-group :value="safeValue" @input="input">
        <el-checkbox style="margin-bottom:10px" v-for="(item,i) in options" :key="i" :label="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
interface Option {
  value: string
  label?: string
}

@Component
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

  @Emit()
  input(e) {
      console.log(e)
    return e
  }
}
</script>