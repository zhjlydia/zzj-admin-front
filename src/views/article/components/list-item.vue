<!-- @format -->

<template>
  <div
    class="list-item"
    @click="detail(item.id)"
  >
    <div style="flex:1;">
      <p class="title">{{ item.title }}</p>
      <div
        class="tag"
        v-for="(tag, index) in item.tags"
        :key="index"
      >
        <el-tag
          size="small"
          type="danger"
          disable-transitions
        >{{ tag.content }}</el-tag>
      </div>
      <div class="description">{{ item.description }}</div>
      <div class="author flex">
        <img
          class="head"
          :src="item.author.image"
          alt=""
        />
        <span class="name">{{ item.author.username }}</span>
        发布于
        <span class="time">{{ item.createdAt }}</span>
      </div>
      <div
        class="category"
        v-if="item.category"
      >类别： {{ item.category.title }}</div>
    </div>
    <div class="button-group">
      <el-button
        type="danger"
        icon="el-icon-edit"
        size="mini"
        circle
        plain
        @click="edit(item.id)"
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-delete"
        size="mini"
        circle
        plain
        @click="del(item.id)"
      ></el-button>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
const article = namespace('article')

@Component
export default class ListItem extends Vue {
  @Prop()
  item: any

  @Emit()
  edit(id) {
    return id
  }

  @Emit()
  del(id) {
    return id
  }

  @Emit()
  detail(id) {
    return id
  }
}
</script>
<style lang="less" scoped>
/** @format */
.list-item {
  color: #ececec;
  font-size: 14px;
  padding: 40px 0;
  border-bottom: 1px solid #415a70;
  display: flex;
  justify-content: space-between;
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
  .button-group {
    width: 200px;
    text-align: center;
  }
}
</style>
