<template>
  <div class="editor-wrap">
    <editor
      ref="toastuiEditor"
      height="900px"
      initialEditType="markdown"
      previewStyle="vertical"
      @change="input"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

@Component({ components: { Editor } })
export default class extends Vue {
  @Prop()
  value: string

  $refs: any = {
    toastuiEditor: Editor
  }

  get safeValue() {
    return this.value || ''
  }

  mounted() {
    this.$refs.toastuiEditor.invoke('setHtml', this.safeValue)
  }

  @Emit()
  input() {
    return this.$refs.toastuiEditor.invoke('getHtml')
  }
}
</script>
<style lang="less" scoped>
.editor-wrap {
  background: #fff;
}
</style>
