<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { SeriesDataForPie } from '@/model/chart'
import { CHART_COLOR } from '@/common/constant'
import BaseChart from './base'

@Component({ mixins: [BaseChart] })
export default class PieChart extends Vue {
  @Prop() private chartData!: SeriesDataForPie[]

  private options: any = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/> 数量: {c} <br/> 占比: {d}%'
    },
    series: [
      {
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
    let seriesdata: SeriesDataForPie[] = this.chartData
    let legendarr =
      this.chartData &&
      this.chartData.map(item => {
        return item.name
      })
    this.options.series[0].data = seriesdata
    console.log(this.options)
  }
}
</script>
