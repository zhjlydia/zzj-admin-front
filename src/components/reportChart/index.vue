<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { RouteRecord } from 'vue-router'
import { options } from './config'
import { SeriesDataForPie } from '@/model/chart'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

@Component
export default class ReportChart extends Vue {
  @Prop({ default: 'bar' })
  private chartType!: string

  @Prop() private isLoading!: boolean

  @Prop() private chartData!: SeriesDataForPie[]

  @Prop() private xAxis: string

  private options: any = JSON.parse(JSON.stringify(options))
  private myChart: any = {}

  @Watch('isLoading')
  private handleLoading(val: boolean) {
    if (val) {
      this.showChartLoading()
    } else {
      this.hideChartLoading()
    }
  }
  @Watch('chartData')
  private handleChartData(val: SeriesDataForPie[]) {
    this.renderChart()
  }
  /** 图表基本配置 */

  private mounted() {
    this.init()
  }
  private beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.destroyedChart()
    this.myChart.dispose()
    this.myChart = null
  }
  private init() {
    this.myChart = echarts.init(this.$el)
    this.renderChart()
  }
  private renderChart() {
    this.formatData()
    // 设置图表数据及配置
    this.myChart.setOption(this.options, true)
  }
  private destroyedChart() {
    this.options.xAxis.data = []
    this.options.series = []
  }
  private formatData() {
    let seriesdata: SeriesDataForPie[] = []
    let legendarr = []
    switch (this.chartType) {
      case 'pie':
        seriesdata = this.chartData
        legendarr = this.chartData.map(item => {
          return item.name
        })
        break
    }
    this.options.series = seriesdata
    this.options.legend.data = legendarr
    console.log(this.chartData, this.options)
  }
  /** 隐藏图表loading */
  private hideChartLoading() {
    let chart = this.myChart
    if (chart) {
      chart.hideLoading()
    }
  }
  /** 展示图表loading */
  private showChartLoading() {
    let chart = this.myChart
    if (chart) {
      chart.showLoading('default', {
        text: '数据加载中...',
        color: '#ef5350',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 1)',
        zlevel: 0
      })
    }
  }
}
</script>
