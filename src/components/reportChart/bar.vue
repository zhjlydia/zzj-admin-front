<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ChartDataForPie, SeriesDataForPie } from '@/model/chart'
import { CHART_COLOR } from '@/common/constant'
import BaseChart from './base'
import echarts from 'echarts/lib/echarts'

@Component({ mixins: [BaseChart] })
export default class LineChart extends Vue {
  @Prop() private chartData!: number[]
  @Prop() private xAxis!: string[]
  private options: any = {
    xAxis: {
      data: [],
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: []
      }
    ]
  }

  private formatData() {
    let seriesdata: number[] = this.chartData

    this.options.series[0].data = seriesdata
  }
}
</script>
