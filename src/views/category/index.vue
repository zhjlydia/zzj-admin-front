<!-- @format -->

<template>
  <div class="main">
    <div class="category-table">
      <div class="title">分类</div>
      <category-table
        :items="copyCategories"
        ref="categoryTable"
        @add="addCategory"
        @save="saveCategory"
        @cancel="cancelCategory"
        @del="delCategory"
      ></category-table>
    </div>
    <div class="tag-table">
      <div class="title">标签</div>
      <tag-table
        :items="copyTags"
        ref="tagTable"
        @add="addTag"
        @save="saveTag"
        @cancel="cancelTag"
        @del="delTag"
      ></tag-table>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'

import Category from '@/model/category'
import Tag from '@/model/tag'

import CategoryTable from './components/category.vue'
import TagTable from './components/tag.vue'

import {Loading, Catch} from '@/plugins/decorators'

const category = namespace('category')
const tag = namespace('tag')

@Component({components: {CategoryTable, TagTable}})
export default class CategoryManage extends Vue {
  @category.State
  categories: Category[]

  @category.Action('fetchList')
  fetchCategoryList: ActionMethod

  @category.Action('submit')
  submitCategory: ActionMethod

  @category.Action('delete')
  deleteCategory: ActionMethod

  @tag.State
  tags: Tag[]

  @tag.Action('fetchList')
  fetchTagList: ActionMethod

  @tag.Action('submit')
  submitTag: ActionMethod

  @tag.Action('delete')
  deleteTag: ActionMethod

  copyCategories: Category[] = []

  categoryItem: Category = null

  copyTags: Tag[] = []

  tagItem: Tag = null

  $refs!: {
    categoryTable: any
    tagTable: any
  }

  async created() {
    this.getCategoryList()
    this.getTagList()
  }

  @Catch
  @Loading
  async getCategoryList() {
    await this.fetchCategoryList()
    this.copyCategories = this.categories
    if (this.$refs && this.$refs.categoryTable) {
      this.$refs.categoryTable.reset()
    }
  }
  @Catch
  @Loading
  async getTagList() {
    await this.fetchTagList()
    this.copyTags = this.tags
    if (this.$refs && this.$refs.tagTable) {
      this.$refs.tagTable.reset()
    }
  }
  addCategory(item: Category) {
    if (item) {
      this.copyCategories.push(item)
    }
  }
  @Catch
  async saveCategory(item: Category) {
    await this.submitCategory(item)
    await this.getCategoryList()
  }
  @Catch
  async delCategory(id: number) {
    await this.deleteCategory(id)
    await this.getCategoryList()
  }
  @Catch
  async cancelCategory() {
    await this.getCategoryList()
  }
  addTag(item: Tag) {
    if (item) {
      this.copyTags.push(item)
    }
  }
  @Catch
  async saveTag(item: Tag) {
    await this.submitTag(item)
    await this.getTagList()
  }
  @Catch
  async delTag(id: number) {
    await this.deleteTag(id)
    await this.getTagList()
  }
  @Catch
  async cancelTag() {
    await this.getTagList()
  }
}
</script>

<style lang="less" scoped>
/** @format */

.main {
  padding: 30px;
  display: flex;
  .category-table {
    flex-grow: 1;
    padding: 20px;
    background: #435c70;
  }
  .tag-table {
    width: 350px;
    margin-left: 50px;
    padding: 20px;
    background: #435c70;
  }
  .title {
    color: #fff;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .head-bar {
    margin-bottom: 20px;
  }
}
</style>
