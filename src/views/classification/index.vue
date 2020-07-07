<!-- @format -->

<template>
  <div class="main"></div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'

import Classification from '@/model/classification'
import Tag from '@/model/tag'

import {Loading, Catch} from '@/plugins/decorators'

const classification = namespace('classification')
const tag = namespace('tag')

@Component({})
export default class ClassificationManage extends Vue {
  @classification.State
  classifications: Classification

  @classification.Action('fetchList')
  fetchClassificationList: ActionMethod

  @tag.State
  tags: Tag

  @tag.Action('fetchList')
  fetchTagList: ActionMethod

  async created() {
    this.fetch()
  }

  @Catch
  @Loading
  async fetch() {
    await this.fetchClassificationList()
    await this.fetchTagList()
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
