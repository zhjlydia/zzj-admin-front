export const options = {
  title: {
    show: false,
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: true,
    data: []
  },
  grid: {
    top: '45',
    left: '20',
    right: '20',
    bottom: '20',
    containLabel: true
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [],
    boundaryGap: true,
    axisLabel: {
      textStyle: {
        color: '#333'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#dfdfdf'
      }
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      interval: 0
    }
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  series: []
}
