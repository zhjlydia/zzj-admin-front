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
        name="文章标题"
      />
      <property
        prop="description"
        name="文章摘要"
        type="textarea"
      />
      <property
        prop="image"
        name="主图"
        type="image"
      />
      <property
        prop="categoryId"
        name="类别"
        type="enum"
        :options="{ options: item.extra.category }"
      />
      <property
        prop="tagIds"
        name="标签"
        type="check"
        :options="{options: item.extra.tag}"
      />
      <property
        prop="createdAt"
        name="创建时间"
        readonly
        type="date"
      />
      <property
        prop="content"
        name="文章内容"
        type="editor"
      />
    </property-table>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { PropertyTable, Property } from '@/components/property-table'
import Item from '@/model/article'
import Basic from './basic'

@Component({
  components: { PropertyTable, Property }
})
export default class extends Basic<Item.Item> {
  protected readonly modelName = '文章'
}
</script>