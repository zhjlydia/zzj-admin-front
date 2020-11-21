<template>
  <div
    class="article__content article__wrap"
    v-html="safeValue"
    v-hljs-directive
  ></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import 'highlight.js/styles/dark.css'

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
<style lang="less" scoped>
.article__wrap {
  background: #fff;
  border-radius: 10px;
}
</style>
