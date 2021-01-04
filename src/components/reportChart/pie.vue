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
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: false,
        label: {
          formatter: '{b|{b}：}{c|{c}}\n{per|{d}%}  ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          padding: [2, 5, 2, 5],
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            b: {
              fontSize: 12,
              lineHeight: 20
            },
            c: {
              color: '#334455',
              fontSize: 14
            },
            per: {
              fontSize: 10,
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
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
  }
}
</script>
