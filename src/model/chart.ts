export interface SeriesDataForPie {
  value: number
  name: string
}
export interface ChartDataForPie {
  seriesData: SeriesDataForPie[]
}

export interface SeriesDataForLineAndBar {
  data: number[]
  name: string
}
