<template>
  <div class="codemirror">
    <textarea ref="editor"></textarea>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/elegant.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'

@Component
export default class extends Vue {
  @Prop({
    type: String
  })
  value: string

  @Prop({
    type: [Boolean, String]
  })
  readonly: boolean | 'nocursor'

  @Prop({
    type: Boolean,
    default: false
  })
  lineNumbers: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  lint: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  lineWrapping: boolean

  @Prop({
    type: String,
    default: 'default'
  })
  theme: string

  @Prop({
    type: String,
    default: 'application/json'
  })
  mode: string

  private editor: CodeMirror.EditorFromTextArea = null

  private get gutters() {
    return this.lineNumbers ? ['CodeMirror-lint-markers'] : []
  }

  get text() {
    return this.editor && this.editor.getValue()
  }

  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.editor as HTMLTextAreaElement, {
      mode: this.mode,
      gutters: this.gutters,
      lineNumbers: this.lineNumbers,
      theme: this.theme,
      lint: this.lint,
      readOnly: this.readonly,
      lineWrapping: this.lineWrapping,
      autoCloseBrackets: true,
      matchBrackets: true
    })
    this.editor.setValue(this.value)
    this.editor.on('change', cm => {
      this.$emit('input', cm.getValue())
      this.$emit('change', cm.getValue())
    })
  }
}
</script>
<style lang="less" scoped>
.codemirror::v-deep {
  text-align: left;
  .CodeMirror {
    height: auto;
  }
  .CodeMirror-scroll {
    margin-right: 2px;
  }
}
</style>