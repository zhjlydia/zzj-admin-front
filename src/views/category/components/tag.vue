<!-- @format -->

<template>
  <div>
    <el-table
      :data="items"
      height="500"
    >
      <el-table-column
        label="标签"
        width="190"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            v-if="editItem && editItem.id === scope.row.id"
            placeholder="请输入标签"
            v-model="editItem.content"
            clearable
          >
          </el-input>
          <div
            v-else
            class="category-cell"
          >{{ scope.row.content }}</div>
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

import Tag from '@/model/tag'

import {Loading, Catch} from '@/plugins/decorators'

@Component({})
export default class TagTable extends Vue {
  @Prop()
  items: Tag[]

  editItem: Tag = null

  @Emit()
  add() {
    if (this.editItem) {
      this.$message.error('先完成当前编辑项哦')
      return null
    }
    this.editItem = {id: 0, content: ''}
    return this.editItem
  }

  @Emit()
  save() {
    return this.editItem
  }

  @Emit()
  cancel() {}

  edit(id: number) {
    this.editItem = this.items.find((item: Tag) => item.id === id)
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
