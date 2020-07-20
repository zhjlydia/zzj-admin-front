<!-- @format -->

<template>
  <div>
    <el-table
      :data="items"
      height="500"
    >
      <el-table-column
        label="分类"
        width="300"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            v-if="editItem && editItem.id === scope.row.id"
            placeholder="请输入分类名称"
            v-model="editItem.title"
            clearable
          >
          </el-input>
          <div
            v-else
            class="category-cell"
          >{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <el-input
            type="textarea"
            autosize
            v-if="editItem && editItem.id === scope.row.id"
            placeholder="请输入描述"
            v-model="editItem.description"
            clearable
          >
          </el-input>
          <div
            v-else
            class="category-cell"
          >{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="editItem && editItem.id === scope.row.id">
            <el-button
              type="danger"
              icon="el-icon-check"
              size="mini"
              circle
              plain
              @click="save(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-close"
              size="mini"
              circle
              plain
              @click="cancel(scope.row.id)"
            ></el-button>
          </template>
          <template v-else>
            <el-button
              type="danger"
              icon="el-icon-edit"
              size="mini"
              circle
              plain
              @click="edit(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              plain
              @click="del(scope.row.id)"
            ></el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-wrap">
      <div
        class="btn btn-yellow"
        @click="add"
      >新增</div>
    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'

import Category from '@/model/category'

import {Loading, Catch} from '@/plugins/decorators'

@Component({})
export default class CategoryTable extends Vue {
  @Prop()
  items: Category[]

  editItem: Category = null

  @Emit()
  add() {
    if (this.editItem) {
      this.$message.error('先完成当前编辑项哦')
      return null
    }
    this.editItem = {id: 0, title: '', description: ''}
    return this.editItem
  }

  @Emit()
  save() {
    return this.editItem
  }

  @Emit()
  cancel() {}

  edit(id: number) {
    this.editItem = this.items.find((item: Category) => item.id === id)
  }

  @Emit()
  del(id: number) {
    return id
  }

  reset() {
    this.editItem = null
  }
}
</script>

<style lang="less" scoped>
/** @format */

.button-wrap {
  width: 100%;
  margin-top: 10px;
  .btn {
    width: 100%;
  }
}
</style>
