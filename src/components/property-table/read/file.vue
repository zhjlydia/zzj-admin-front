<template>
  <el-link
    :href="value"
    :underline="false"
    target="_blank"
  >{{value}}</el-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string
}
</script>