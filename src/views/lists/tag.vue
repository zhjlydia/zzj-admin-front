<template>
  <basic-list
    model="tag"
    allow-create
  >
  <el-table-column
      prop="content"
      label="标签"
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
