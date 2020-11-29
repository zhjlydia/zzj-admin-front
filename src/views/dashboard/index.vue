<!-- @format -->

<template>
  <div class="dashboard">
    <div class="brief-data">
      <div class="brief-data-item">
        <p class="label">文章总量</p>
        <p class="value">88</p>
      </div>
      <div class="brief-data-item">
        <p class="label">项目总量</p>
        <p class="value">88</p>
      </div>
      <div class="brief-data-item">
        <p class="label">总访问量</p>
        <p class="value">88</p>
      </div>
      <div class="brief-data-item">
        <p class="label">总访问人数</p>
        <p class="value">88</p>
      </div>
    </div>
    <div class="chart-module">
      <div class="chart-wrap">
        <pie-chart :chartData="chartData"></pie-chart>
      </div>
      <div class="chart-wrap">
        <pie-chart :chartData="chartData"></pie-chart>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import pieChart from '@/components/reportChart/pie.vue'

@Component({ components: { pieChart } })
export default class Dashboard extends Vue {
  chartData = {
    name: '测试',
    seriesData: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ]
  }
}
</script>
<style lang="less" scoped>
.dashboard {
  .brief-data {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .brief-data-item {
      width: 23.5%;
      background: #2b3153;
      padding: 30px;
      color: #fff;
      border-radius: 10px;
    }
  }
  .chart-module {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .chart-wrap {
      width: 49%;
      background: #2b3153;
      padding: 30px;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
