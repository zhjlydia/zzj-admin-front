import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import { CHART_COLOR } from '@/common/constant'
import { debounce } from 'lodash'

@Component
export default class BaseChart extends Vue {
  @Prop() private isLoading!: boolean
  @Prop() private chartData!: any

  private myChart: any = {}

  private options: any = {
    color: CHART_COLOR,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        z: 0,
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0,0,0,0.2)'
        }
      },
      backgroundColor: '#eee',
      borderColor: '#aaa',
      borderWidth: 1,
      padding: [5, 10, 5, 10],
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      show: false
    },
    grid: {
      show: true,
      left: '30',
      right: '30',
      bottom: '0',
      top: '10',
      containLabel: true,
      borderColor: '#3b5263'
    }
  }

  private resizeHandler!: () => void

  @Watch('isLoading')
  private handleLoading(val: boolean): void {
    console.log('loading', val)
    if (val) {
      this.showChartLoading()
    } else {
      this.hideChartLoading()
    }
  }

  @Watch('chartData')
  private handleChartData(val: any): void {
    this.renderChart()
  }

  private mounted(): void {
    this.init()
    this.resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize()
      }
    }, 200)
    window.addEventListener('resize', this.resizeHandler)
  }
  private beforeDestroy(): void {
    if (!this.myChart) {
      return
    }
    window.removeEventListener('resize', this.resizeHandler)
    this.destroyedChart()
    this.myChart.dispose()
    this.myChart = null
  }
  private init(): void {
    this.myChart = echarts.init(this.$el)
    if (this.chartData) {
      this.renderChart()
    }
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
