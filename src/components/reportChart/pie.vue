<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ChartDataForPie, SeriesDataForPie } from '@/model/chart'
import BaseChart from './base'

@Component({ mixins: [BaseChart] })
export default class PieChart extends Vue {
  @Prop() private chartData!: ChartDataForPie

  private options: any = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: []
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
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
