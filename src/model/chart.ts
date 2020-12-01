export interface SeriesDataForPie {
  value: number
  name: string
}
export interface ChartDataForPie {
  seriesData: SeriesDataForPie[]
  name: string
}
