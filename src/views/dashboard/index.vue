<!-- @format -->

<template>
  <div class="dashboard">
    <div class="brief-data">
      <div class="brief-data-item">
        <p class="label">文章</p>
        <p class="value">88</p>
        <div>去创作</div>
      </div>
      <div class="brief-data-item">
        <p class="label">项目</p>
        <p class="value">88</p>
        <div>去创作</div>
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
      <div class="chart-wrap single">
        <div class="chart-title">pv/uv</div>
        <div class="chart">
          <line-chart :chartData="lineData" :xAxis="dataAxis"></line-chart>
        </div>
      </div>
    </div>
    <div class="chart-module">
      <div class="chart-wrap">
        <div class="chart-title">文章分类占比</div>
        <div class="chart">
          <pie-chart :chartData="articleGroupByCategory"></pie-chart>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="chart-title">每月文章发布数量</div>
        <div class="chart">
          <bar-chart :chartData="barData" :xAxis="dataAxis"></bar-chart>
        </div>
      </div>
    </div>
    <div class="chart-module">
      <div class="chart-wrap">
        <div class="chart-title">阅读量top5</div>
        <div class="chart">
          <vertical-bar-chart
            :chartData="verticalBarData"
            :yAxis="verticalAxis"
          ></vertical-bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import pieChart from '@/components/reportChart/pie.vue'
import barChart from '@/components/reportChart/bar.vue'
import lineChart from '@/components/reportChart/line.vue'
import verticalBarChart from '@/components/reportChart/vertical-bar.vue'
import { namespace, State, Action } from 'vuex-class'
import { ActionMethod } from 'vuex'
import { SeriesDataForPie } from '@/model/chart'
import { Catch } from '@/plugins/decorators'
const dashboard = namespace('dashboard')

@Component({ components: { pieChart, barChart, lineChart, verticalBarChart } })
export default class Dashboard extends Vue {
  @dashboard.State
  articleGroupByCategory: SeriesDataForPie[]

  @dashboard.Action
  getArticleGroupByCategory: ActionMethod

  isLoading = false

  created(): void {
    this.init()
  }

  @Catch
  async init(): Promise<void> {
    this.isLoading = true
    let res = await Promise.all([this.getArticleGroupByCategory()])
    console.log(this.articleGroupByCategory)
    this.isLoading = false
  }
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
  dataAxis = [
    '2020-01',
    '2020-02',
    '2020-03',
    '2020-04',
    '2020-05',
    '2020-06',
    '2020-07',
    '2020-08',
    '2020-09',
    '2020-10',
    '2020-11',
    '2020-12'
  ]
  verticalAxis = [
    '文章名字可能是这么长的一定要看下',
    '文章名字可能是这么长',
    '文章名字可能是这么长',
    '文章名字可能是这么长',
    '文章名字可能是这么长'
  ]
  barData = [
    {
      name: '文章数',
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 111, 88]
    }
  ]
  verticalBarData = [
    {
      name: '阅读量',
      data: [220, 182, 191, 234, 290]
    }
  ]
  lineData = [
    {
      name: 'pv',
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 111, 88]
    },
    {
      name: 'uv',
      data: [22, 18, 19, 23, 29, 33, 31, 12, 44, 32, 11, 8]
    }
  ]
}
</script>
<style lang="less" scoped>
@import '~@/styles/theme.less';
.dashboard {
  color: #fff;
  .brief-data {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .brief-data-item {
      width: 23.5%;
      background: @chart-color;
      padding: 20px;
      border-radius: 10px;
    }
  }
  .chart-module {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .chart-wrap {
      width: 49%;
      background: @chart-color;
      padding: 20px 0;
      border-radius: 10px;
      .chart {
        height: 200px;
      }
      .chart-title {
        position: relative;
        padding-left: 30px;
        margin-bottom: 20px;
        &:before {
          content: '';
          position: absolute;
          width: 4px;
          border-radius: 4px;
          top: 0;
          left: 20px;
          bottom: 0;
          background: @light-color;
        }
      }
    }
    .chart-wrap.single {
      width: 100%;
    }
  }
}
</style>
