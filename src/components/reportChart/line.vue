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
export default class LineChart extends Vue {
  @Prop() private chartData!: SeriesDataForLineAndBar[]
  @Prop() private xAxis!: string[]
  private options: any = {
    tooltip: {
      axisPointer: {
        z: 0,
        type: 'line',
        lineStyle: {
          color: 'rgba(0,0,0,0.2)'
        }
      }
    },
    xAxis: {
      show: true,
      data: [],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        },
        interval: 1
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      boundaryGap: false
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
          color: '#fff'
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
        type: 'line',
        smooth: true,
        itemStyle: {
          color: CHART_COLOR[i]
        },
        areaStyle: {
          color: CHART_COLOR[i],
          opacity: 0.2
        },
        data: item.data
      }
    })
    this.options.series = series
    this.options.xAxis.data = this.xAxis
  }
}
</script>
