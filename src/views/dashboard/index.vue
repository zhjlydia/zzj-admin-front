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
        <div class="chart-title">最近一个月pv/uv</div>
        <div class="chart">
          <line-chart
            :chartData="pvUvData"
            :xAxis="pvUvAxis"
            :isLoading="isLoading"
          ></line-chart>
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
          <bar-chart
            :chartData="articleMonthData"
            :xAxis="articleCountAxis"
            :isLoading="isLoading"
          ></bar-chart>
        </div>
      </div>
    </div>
    <div class="chart-module">
      <div class="chart-wrap">
        <div class="chart-title">阅读量top5</div>
        <div class="chart">
          <vertical-bar-chart
            :chartData="top5ArticleData"
            :yAxis="articlePvTop5Axis"
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
import { SeriesDataForLineAndBar, SeriesDataForPie } from '@/model/chart'
import { Catch } from '@/plugins/decorators'
import dayjs from 'dayjs'
const dashboard = namespace('dashboard')

@Component({ components: { pieChart, barChart, lineChart, verticalBarChart } })
export default class Dashboard extends Vue {
  @dashboard.State
  articleGroupByCategory: SeriesDataForPie[]

  @dashboard.State
  dailyPv: SeriesDataForLineAndBar

  @dashboard.State
  dailyUv: SeriesDataForLineAndBar

  @dashboard.State
  pvUvAxis: string[]

  @dashboard.State
  articleCountByMonth: SeriesDataForLineAndBar

  @dashboard.State
  articleCountAxis: string[]

  @dashboard.State
  articlePvTop5: SeriesDataForLineAndBar

  @dashboard.State
  articlePvTop5Axis: string[]

  @dashboard.Action
  getArticleGroupByCategory: ActionMethod

  @dashboard.Action
  getDailyPvUv: ActionMethod

  @dashboard.Action
  getArticleCountByMonth: ActionMethod

  @dashboard.Action
  getTop5Article: ActionMethod

  @dashboard.Action
  getSummaryData: ActionMethod

  isLoading = false

  get pvUvData() {
    if (this.dailyPv && this.dailyUv) {
      return [this.dailyPv, this.dailyUv]
    }
    return null
  }

  get articleMonthData() {
    if (this.articleCountByMonth) {
      return [this.articleCountByMonth]
    }
    return null
  }

  get top5ArticleData() {
    if (this.articlePvTop5) {
      return [this.articlePvTop5]
    }
    return null
  }

  created(): void {
    this.init()
  }

  @Catch
  async init(): Promise<void> {
    this.isLoading = true
    await Promise.all([
      this.getArticleGroupByCategory(),
      this.getDailyPvUv({
        begin: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')
      }),
      this.getArticleCountByMonth({
        begin: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')
      }),
      this.getTop5Article(),
      this.getSummaryData()
    ])
    this.isLoading = false
  }
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
