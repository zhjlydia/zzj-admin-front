<template>
  <el-main>
    <div class="model-wrap">
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
        prop="title"
        name="名称"
      />
      <property
        prop="description"
        name="描述"
      />
      <property
        prop="module"
        name="所属模块"
        type="enum"
        :options="{options:moduleTypes}"
      />
    </property-table>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { PropertyTable, Property } from '@/components/property-table'
import Item from '@/model/category'
import Basic from './basic'

@Component({
  components: { PropertyTable, Property }
})
export default class extends Basic<Item.Item> {
  protected readonly modelName = '分类'

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