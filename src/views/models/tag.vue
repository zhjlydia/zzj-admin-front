<template>
<div class="model-wrap">
  <el-main>
    <property-table
      v-if="item"
      allow-refresh
      allow-edit
      :title="title"
      :value="item"
      :edit-mode="mode!=='view'"
      @refresh="reload"
      @submit="submit"
      @json-error="onJsonError"
      @remove="remove"
    >
      <property
        prop="content"
        name="标签"
      />
      <property
        prop="module"
        name="所属模块"
        type="enum"
        :options="{options:moduleTypes}"
      />
    </property-table>
  </el-main>
</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { PropertyTable, Property } from '@/components/property-table'
import Item from '@/model/tag'
import Basic from './basic'

@Component({
  components: { PropertyTable, Property }
})
export default class extends Basic<Item.Item> {
  protected readonly modelName = '标签'

  private moduleTypes=[
    {
      label:'article',
      value:'article'
    },
    {
      label:'project',
      value:'project'
    }
  ]
}
</script>