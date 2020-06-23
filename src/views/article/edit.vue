<!-- @format -->

<template>
  <div>
    编辑
    <editor
      :initialValue="editorText"
      :options="editorOptions"
      height="500px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
    />
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import {Editor} from '@toast-ui/vue-editor'

@Component({components: {Editor}})
export default class Articles extends Vue {
  editorText: string = ''
  editorOptions: any = {}
}
</script>
