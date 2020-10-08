<template>
  <basic-list
    model="category"
    allow-create
  >
  <el-table-column
      prop="title"
      label="名称"
    >
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
    >
    </el-table-column>
    <el-table-column
      prop="module"
      label="所属模块"
    >
    </el-table-column>
  </basic-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BasicList from './basic.vue'
import dayjs from 'dayjs'

@Component({
  components: { BasicList }
})
export default class extends Vue {

}
</script>
