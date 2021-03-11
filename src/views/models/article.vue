<template>
  <el-main>
    <div class="model-wrap">
      <property-table
        :model="model"
        v-if="item"
        allow-refresh
        allow-edit
        :title="title"
        :value="item"
        :edit-mode="mode !== 'view'"
        @refresh="reload"
        @submit="submit"
        @json-error="onJsonError"
        @remove="remove"
      >
        <property prop="title" name="文章标题" />
        <property prop="description" name="文章摘要" type="textarea" />
        <property
          prop="image"
          name="主图"
          type="image"
          :options="{ folder: 'article' }"
        />
        <property
          prop="state"
          name="上下架状态"
          type="enum"
          :options="{ options: shelfState }"
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
          :options="{ options: item.extra.tag }"
        />
        <property prop="createdAt" name="创建时间" readonly type="date" />
        <property prop="content" name="文章内容" type="editor" />
      </property-table>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { PropertyTable, Property } from '@/components/property-table'
import { Article } from '@/model/article'
import Basic from './basic'

@Component({
  components: { PropertyTable, Property }
})
export default class extends Basic<Article> {
  protected readonly modelName = '文章'

  shelfState = [
    { label: '已上架', value: 1 },
    { label: '已下架', value: 2 }
  ]
}
</script>
