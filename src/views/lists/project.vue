<template>
  <basic-list model="project" allow-create>
    <el-table-column width="200">
      <div slot-scope="scope">
        <img class="project-image" :src="scope.row.image" alt="" />
      </div>
    </el-table-column>
    <el-table-column>
      <div slot-scope="scope">
        <div class="list-item">
          <div class="title-wrap">
            <p class="title">{{ scope.row.name }}</p>
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
          <div class="info">
            <div class="item" v-if="scope.row.category">
              类别： {{ scope.row.category.title }}
            </div>
            <div class="item" v-if="scope.row.stateText">
              项目进度： {{ scope.row.stateText }}
            </div>
            <div class="item" v-if="scope.row.role">
              我的角色： {{ scope.row.role }}
            </div>
            <div class="item">
              时间： {{ scope.row.startedAt | formatDate('YYYY-MM-DD') }} 至
              {{ scope.row.endedAt | formatDate('YYYY-MM-DD') }}
            </div>
          </div>
          <div class="info" v-if="scope.row.github">
            <div class="item">仓库地址： {{ scope.row.github }}</div>
          </div>
          <div class="info" v-if="scope.row.url">
            <div class="item">预览地址： {{ scope.row.url }}</div>
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
    margin-bottom: 15px;
  }
  .info {
    display: flex;
    color: #dcdcdc;
  }
  .item {
    font-size: 12px;
    padding-right: 20px;
    position: relative;
  }
  .item + .item {
    padding-left: 20px;
    &:before {
      content: '|';
      position: absolute;
      left: 0;
    }
  }
}
.project-image {
  width: 150px;
  height: auto;
  border-radius: 10px;
}
</style>
