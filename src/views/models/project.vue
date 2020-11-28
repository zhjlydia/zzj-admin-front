<template>
  <el-main>
    <div class="model-wrap">
      <property-table
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
        <property prop="name" name="项目名称" />
        <property prop="description" name="项目摘要" type="textarea" />
        <property
          prop="image"
          name="主图"
          type="image"
          :options="{ folder: 'project' }"
        />
        <property prop="state" name="项目状态" />
        <property prop="github" name="仓库地址" />
        <property prop="role" name="角色" />
        <property prop="url" name="预览地址" />
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
        <property prop="startedAt" name="开始时间" type="date" />
        <property prop="endedAt" name="结束时间" type="date" />
        <property prop="createdAt" name="创建时间" readonly type="date" />
        <property prop="content" name="项目内容" type="editor" />
      </property-table>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { PropertyTable, Property } from '@/components/property-table'
import { Project } from '@/model/project'
import Basic from './basic'

@Component({
  components: { PropertyTable, Property }
})
export default class extends Basic<Project> {
  protected readonly modelName = '项目'
}
</script>
