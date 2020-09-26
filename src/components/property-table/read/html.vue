<template>
  <div v-html="safeValue"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  value: any

  @Prop({
    type: Object
  })
  vars: any

  get safeValue() {
    if (!this.value || typeof this.value !== 'string' || !this.vars) {
      return this.value
    }
    return this.value.replace(/\$\{(\w+)\}/gi, (sub, cap) => {
      if (this.vars[cap] != null) {
        return this.vars[cap]
      }
      return sub
    })
  }
}
</script>