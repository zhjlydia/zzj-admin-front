<!-- @format -->

<template>
  <div class="edit-article">
    <el-form :model="form" :rules="rules" ref="articleForm" label-width="60px" class="edit-form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <el-input type="textarea" :rows="3" v-model="form.description" placeholder="请输入摘要"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="categoryId">
        <el-select v-model="form.categoryId" filterable placeholder="请选择类别">
          <el-option v-for="item in categories" :key="item.id" :label="item.title" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <tag-component
          v-for="(item, index) in tags"
          :key="index"
          :color="getColor(item.id)"
          :selected="form.tags.indexOf(item.id) !== -1"
          @click.native="toggleSelect(item.id)"
          >{{ item.content }}</tag-component
        >
      </el-form-item>
    </el-form>
    <div class="editor-wrap">
      <editor ref="toastuiEditor" height="900px" initialEditType="markdown" previewStyle="vertical" />
    </div>
    <div class="btn-suspended-panel"><div class="btn btn-purple" @click="submit">保存</div></div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import TagComponent from '@/components/tag.vue'

import {Editor} from '@toast-ui/vue-editor'
import Article from '@/model/article'
import Category from '@/model/category'
import Tag from '@/model/tag'

const article = namespace('article')
const category = namespace('category')
const tag = namespace('tag')

import {COLOR_ARRAY} from '@/common/constant'
import {Loading, Catch} from '@/plugins/decorators'

@Component({components: {Editor, TagComponent}})
export default class Articles extends Vue {
  @article.State
  articleDetail: Article

  @article.Action('fetchDetail')
  fetchArticleDetail: ActionMethod

  @article.Action('submit')
  submitArticle: ActionMethod

  @article.Action
  resetArticleDetail: ActionMethod

  @article.Mutation
  M_SET_ID: ActionMethod

  @category.State
  categories: Category

  @category.Action('fetchList')
  fetchCategoryList: ActionMethod

  @tag.State
  tags: Tag

  @tag.Action('fetchList')
  fetchTagList: ActionMethod

  $refs: any = {
    toastuiEditor: Editor
  }

  rules: object = {
    title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
    description: [{required: true, message: '请选择文章摘要', trigger: 'blur'}],
    categoryId: [{required: true, message: '请选择类别', trigger: 'change'}]
  }

  form: Article.ArticleVo = {
    title: '',
    description: '',
    content: '',
    categoryId: null,
    tags: []
  }
  editorOptions: any = {}

  id: number = 0

  getColor(id: number) {
    let index = id % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }

  @Catch
  @Loading
  async created() {
    const {id = 0} = this.$route.params
    let articleId = Number(id)
    if (articleId) {
      await this.M_SET_ID(articleId)
      await this.init()
    }
    await this.getCategoryList()
    await this.getTagList()
  }

  async init() {
    await this.fetchArticleDetail()
    if (this.articleDetail) {
      let article = this.articleDetail
      this.form = {
        title: article.title,
        description: article.description,
        content: article.content,
        categoryId: article.category.id,
        tags:
          article.tags && article.tags.length
            ? article.tags.map(item => {
                return item.id
              })
            : []
      }
      this.$refs.toastuiEditor.invoke('setHtml', article.content)
    }
  }

  async getCategoryList() {
    await this.fetchCategoryList()
  }

  async getTagList() {
    await this.fetchTagList()
  }

  toggleSelect(id: number) {
    let index = this.form.tags.indexOf(id)
    if (index !== -1) {
      this.form.tags.splice(index, 1)
    } else {
      this.form.tags.push(id)
    }
  }

  @Catch
  async submit() {
    this.$refs.articleForm.validate(async valid => {
      if (valid) {
        const content = this.$refs.toastuiEditor.invoke('getHtml')
        if (!content) {
          this.$message.error('内容不允许为空')
        } else {
          this.form.content = content
          let res = await this.submitArticle(this.form)
          this.$router.push({name: 'ArticleDetail', params: {id: String(res)}})
        }
      }
    })
  }

  destroyed() {
    this.resetArticleDetail()
  }
}
</script>
<style lang="less" scoped>
.edit-article {
  .edit-form {
    background: #435c70;
    padding: 30px;
  }
  .editor-wrap {
    padding: 30px;
    background: #fff;
    margin-bottom: 50px;
  }
}
</style>
