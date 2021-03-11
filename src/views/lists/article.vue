<template>
  <basic-list model="article" allow-create>
    <el-table-column>
      <div slot-scope="scope">
        <div class="list-item">
          <div class="title-wrap">
            <p class="title">{{ scope.row.title }}</p>
            <div
              class="state"
              :class="{ 'state-up': scope.row.state === stateEnum.UP }"
            >
              {{ scope.row.state === stateEnum.UP ? '已上架' : '已下架' }}
            </div>
          </div>
          <tag
            v-for="(tag, i) in scope.row.tags"
            :key="i"
            :color="getColor(i)"
            :selected="true"
            >{{ tag.content }}
          </tag>
          <div class="description">{{ scope.row.description }}</div>
          <div class="author flex">
            <img class="head" :src="scope.row.author.image" alt="" />
            <span class="name">{{ scope.row.author.username }}</span>
            发布于
            <span class="time">{{ scope.row.createdAt | formatDate }}</span>
          </div>
          <div class="category" v-if="scope.row.category">
            类别： {{ scope.row.category.title }}
          </div>
        </div>
      </div>
    </el-table-column>
  </basic-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BasicList from './basic.vue'
import tag from '@/components/tag.vue'
import { COLOR_ARRAY } from '@/common/constant'
import { formatDate } from '@/utils/filters'
import { StateEnum } from '@/model/common'

@Component({
  components: { BasicList, tag },
  filters: { formatDate }
})
export default class extends Vue {
  stateEnum = StateEnum
  getColor(i: number) {
    let index = i % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }
}
</script>
<style lang="less" scoped>
/** @format */
.list-item {
  color: #ececec;
  font-size: 14px;
  cursor: pointer;
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .state {
    font-size: 14px;
  }
  .state-up {
    color: #feba34;
  }
  .description {
    margin-bottom: 20px;
    line-height: 1.5;
  }
  .tag {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .author {
    display: flex;
    align-items: center;
    font-size: 12px;
    .name {
      margin: 0 10px;
      color: #feba34;
    }
    .head {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    .time {
      margin-left: 10px;
      color: #feba34;
    }
  }
  .category {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
