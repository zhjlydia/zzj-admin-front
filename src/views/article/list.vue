<!-- @format -->

<template>
  <div class="main">
    <div class="head-bar">
      <div class="btn btn-red">新建</div>
    </div>
    <div class="article-list">
      <list-item v-for="(item, index) in articles" :key="index" :item="item"></list-item>
    </div>
    <div class="pagination">
      <el-pagination
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="index"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'

import Article from '@/model/article'

import listItem from './components/list-item.vue'

const article = namespace('article')

@Component({components: {listItem}})
export default class Articles extends Vue {
  @article.State
  articles: Article[]

  @article.State
  index: number

  @article.State
  size: number

  @article.State
  total: number

  @article.Action
  getArticles: ActionMethod

  async created() {
    this.getArticles()
  }

  changePage(index) {
    console.log(index)
  }
}
</script>

<style lang="less" scoped>
.main {
  background: #435c70;
  padding: 30px;
  .head-bar {
    margin-bottom: 20px;
  }
  .article-list {
    background: #50697f;
    padding: 0 30px;
  }
  .pagination {
    text-align: right;
    padding: 20px 0;
  }
}
</style>
