<!-- @format -->

<template>
  <div>
    <div class="article-detail" v-if="articleDetail">
      <div class="detail-body">
        <div class="article-header">
          <div>
            <div class="title">{{ articleDetail.title }}</div>
            <tag-component
              v-for="(item, index) in articleDetail.tags"
              :key="index"
              :color="getColor(item.id)"
              :selected="true"
              >{{ item.content }}</tag-component
            >
          </div>
          <div class="time">
            <div>{{ articleDetail.createdAt }}</div>
          </div>
        </div>
        <div class="content article__content" v-html="articleDetail.content" v-hljs-directive></div>
      </div>
      <div class="btn-suspended-panel"><div class="btn btn-green" @click="edit">编辑</div></div>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'

import 'highlight.js/styles/dark.css'

import TagComponent from '@/components/tag.vue'

import Article from '@/model/article'
import Category from '@/model/category'
import Tag from '@/model/tag'

const article = namespace('article')
const category = namespace('category')
const tag = namespace('tag')

import {COLOR_ARRAY} from '@/common/constant'
import {Loading, Catch} from '@/plugins/decorators'

@Component({components: {TagComponent}})
export default class ArticleDetail extends Vue {
  @article.State
  articleDetail: Article

  @article.State
  id: number

  @article.Action('fetchDetail')
  fetchArticleDetail: ActionMethod

  @article.Action
  resetArticleDetail: ActionMethod

  @article.Mutation
  M_SET_ID: ActionMethod

  getColor(id: number) {
    let index = id % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }

  async created() {
    const {id = 0} = this.$route.params
    let articleId = Number(id)
    if (articleId) {
      await this.M_SET_ID(articleId)
      await this.init()
    }
  }

  @Catch
  @Loading
  async init() {
    await this.fetchArticleDetail()
    if (this.articleDetail) {
      let article = this.articleDetail
    }
  }

  edit() {
    this.$router.push({name: 'ArticleEdit', params: {id: String(this.id)}})
  }

  destroyed() {
    this.resetArticleDetail()
  }
}
</script>
<style lang="less" scoped>
.article-detail {
  .detail-body {
    background: #435c70;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .article-header {
    background: #435c70;
    color: #fff;
    padding: 50px 30px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 28px;
      font-weight: 600;
      text-shadow: 1px 1px #333;
      margin-bottom: 10px;
    }
    .time {
      font-size: 14px;
      padding: 10px;
      border: 1px dashed #fff;
      width: 100px;
      line-height: 30px;
      text-align: center;
    }
  }
  .content {
    background: #fff;
    padding: 30px;
  }
  .save-btn {
    float: right;
    width: 100px;
    display: block;
    margin: 30px 0;
  }
}
</style>
