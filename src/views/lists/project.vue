
<template>
  <basic-list model="project" allow-create>
    <el-table-column width="200">
      <div slot-scope="scope">
        <img class="project-image" :src="scope.row.image" alt="">
      </div>
    </el-table-column>
    <el-table-column>
      <div slot-scope="scope">
        <div class="list-item">
            <p class="title">{{ scope.row.name }}</p>
          <div class="tag" v-for="(tag, index) in scope.row.tags" :key="index">
            <el-tag size="small" type="danger" disable-transitions>{{ tag.content }}</el-tag>
          </div>
          <div class="description">{{ scope.row.description }}</div>
          <div class="info">
            <div class="item" v-if="scope.row.category">类别： {{ scope.row.category.title }}</div>
            <div class="item" v-if="scope.row.role">我的角色： {{ scope.row.role }}</div>
          </div>
          <div class="info">
            <div class="item" v-if="scope.row.github">仓库地址： {{ scope.row.github }}</div>
          </div>
          <div class="info">
            <div class="item">{{ scope.row.createdAt | formatDate }}</div>
          </div>
        </div>
      </div>
    </el-table-column>
  </basic-list>
</template>

<script lang="ts">

import {Vue, Component} from 'vue-property-decorator'
import BasicList from './basic.vue'
import {formatDate} from '@/utils/filters'
import dayjs from 'dayjs'

@Component({
  components: {BasicList},
  filters: {formatDate}
})
export default class extends Vue {}
</script>
<style lang="less" scoped>
.list-item {
  color: #ececec;
  font-size: 14px;
  cursor: pointer;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .description {
    margin-bottom: 20px;
    line-height: 1.5;
  }
  .tag {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 15px;
  }
  .info{
      display: flex;
      color: #bdbbb7;
  }
  .item {
    font-size: 12px;
    margin-right: 20px;
  }
}
.project-image{
    width:150px;
    height:auto;
    border-radius:10px;
}
</style>
