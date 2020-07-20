<!-- @format -->

<template>
  <div>
    <div class="main">
      <template v-if="articles.length">
        <div class="article-list">
          <list-item
            v-for="(item, index) in articles"
            :key="index"
            :item="item"
            @edit="edit"
            @detail="detail"
          ></list-item>
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
      </template>
      <div class="list-empty mar-t-100" v-else>
        这里空空如也
        <div class="mar-t-20">
          <div class="btn btn-red" @click="add">新建</div>
        </div>
      </div>
    </div>
    <div v-if="articles.length" class="btn-suspended-panel"><div class="btn btn-red" @click="add">新建</div></div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'

import Article from '@/model/article'

import listItem from './components/list-item.vue'
import {Loading, Catch} from '@/plugins/decorators'

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
  fetchList: ActionMethod

  async created() {
    this.fetch(1)
  }

  changePage(index) {
    this.fetch(index)
  }

  @Catch
  @Loading
  async fetch(index) {
    await this.fetchList(index)
  }

  edit(id: number) {
    this.$router.push({name: 'ArticleEdit', params: {id: String(id)}})
  }
  add() {
    this.$router.push({name: 'ArticleEdit'})
  }

  detail(id: number) {
    this.$router.push({name: 'ArticleDetail', params: {id: String(id)}})
  }
}
</script>

<style lang="less" scoped>
.main {
  background: #435c70;
  padding: 30px;
  min-height: 400px;
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
