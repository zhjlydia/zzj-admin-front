<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import {
  ChartDataForPie,
  SeriesDataForLineAndBar,
  SeriesDataForPie
} from '@/model/chart'
import { CHART_COLOR } from '@/common/constant'
import BaseChart from './base'
import echarts from 'echarts/lib/echarts'

@Component({ mixins: [BaseChart] })
export default class BarChart extends Vue {
  @Prop() private chartData!: SeriesDataForLineAndBar[]
  @Prop() private yAxis!: string[]
  private options: any = {
    xAxis: {
      show: true,
      type: 'value',
      data: [],
      axisLabel: {
        show: true,
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
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#fff'
        },
        formatter: function (value) {
          return `${value.length > 5 ? value.substring(0, 5) + '...' : value}`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#5f6984'
        }
      }
    },
    series: []
  }

  private formatData() {
    let series: any = this.chartData.map((item, i) => {
      return {
        name: item.name,
        type: 'bar',
        barWidth: '25%',

        data: item.data.map((subItem, i) => {
          return {
            value: subItem,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: CHART_COLOR[i] },
                { offset: 1, color: '#fff' }
              ]),
              barBorderRadius: [0, 5, 5, 0]
            }
          }
        })
      }
    })
    this.options.series = series
    this.options.yAxis.data = this.yAxis
  }
}
</script>
