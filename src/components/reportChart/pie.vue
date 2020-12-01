<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ChartDataForPie, SeriesDataForPie } from '@/model/chart'
import { CHART_COLOR } from '@/common/constant'
import BaseChart from './base'

@Component({ mixins: [BaseChart] })
export default class PieChart extends Vue {
  @Prop() private chartData!: ChartDataForPie

  private options: any = {
    color: CHART_COLOR,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: false,
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          bleedMargin: 5
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        data: []
      }
    ]
  }

  private formatData() {
    let seriesdata: SeriesDataForPie[] = this.chartData.seriesData
    let legendarr = this.chartData.seriesData.map(item => {
      return item.name
    })

    this.options.series[0].data = seriesdata
    this.options.legend.data = legendarr
  }
}
</script>
