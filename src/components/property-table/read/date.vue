<template>
  <i>{{text}}</i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'

@Component
export default class extends Vue {
  @Prop()
  value: Date | string | number

  @Prop({
    type: String,
    default: 'YY-MM-DD HH:mm'
  })
  format: string

  get text() {
    return this.value && dayjs(this.value).format(this.format)
  }
}
</script>