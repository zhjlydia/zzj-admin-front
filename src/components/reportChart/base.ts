import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

@Component
export default class BaseChart extends Vue {
  @Prop() private isLoading!: boolean
  private myChart: any = {}

  private options: any = {}

  @Watch('isLoading')
  private handleLoading(val: boolean): void {
    if (val) {
      this.showChartLoading()
    } else {
      this.hideChartLoading()
    }
  }

  private mounted(): void {
    console.log('mounted')
    this.init()
  }
  private beforeDestroy(): void {
    if (!this.myChart) {
      return
    }
    this.destroyedChart()
    this.myChart.dispose()
    this.myChart = null
  }
  private init(): void {
    this.myChart = echarts.init(this.$el)
    this.renderChart()
  }
  private formatData(): void {}
  private renderChart(): void {
    this.formatData()
    // 设置图表数据及配置
    this.myChart.setOption(this.options, true)
  }
  private destroyedChart(): void {}

  /** 隐藏图表loading */
  private hideChartLoading(): void {
    if (this.myChart) {
      this.myChart.hideLoading()
    }
  }
  /** 展示图表loading */
  private showChartLoading(): void {
    if (this.myChart) {
      this.myChart.showLoading('default', {
        text: '数据加载中...',
        color: '#ef5350',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 1)',
        zlevel: 0
      })
    }
  }
}
