/** @format */
import http from '@/apis'
import { SeriesDataForPie, SeriesDataForLineAndBar } from '@/model/chart'
import dayjs from 'dayjs'
import { ActionTree, MutationTree } from 'vuex'
import { State as Root } from '..'

export interface SummaryData {
  articleCount: number
  projectCount: number
  pv: number
  uv: number
}

export interface State {
  articleGroupByCategory: SeriesDataForPie[]
  dailyPv: SeriesDataForLineAndBar
  dailyUv: SeriesDataForLineAndBar
  pvUvAxis: string[]
  articleCountByMonth: SeriesDataForLineAndBar
  articleCountAxis: string[]
  articlePvTop5: SeriesDataForLineAndBar
  articlePvTop5Axis: string[]
  summaryData: SummaryData
}

export const state: State = {
  articleGroupByCategory: null,
  dailyPv: null,
  dailyUv: null,
  pvUvAxis: [],
  articleCountByMonth: null,
  articleCountAxis: [],
  articlePvTop5: null,
  articlePvTop5Axis: [],
  summaryData: null
}

export const mutations: MutationTree<State> = {
  M_SET_ARTICLEGROUPBYCATEGORY(
    state: State,
    articleGroupByCategory: SeriesDataForPie[]
  ) {
    state.articleGroupByCategory = articleGroupByCategory
  },
  M_SET_DAILYPV(state: State, dailyPv: SeriesDataForLineAndBar) {
    state.dailyPv = dailyPv
  },
  M_SET_DAILYUV(state: State, dailyUv: SeriesDataForLineAndBar) {
    state.dailyUv = dailyUv
  },
  M_SET_PVUVAXIS(state: State, pvUvAxis: string[]) {
    state.pvUvAxis = pvUvAxis
  },
  M_SET_ARTICLECOUNTBYMONTH(
    state: State,
    articleCountByMonth: SeriesDataForLineAndBar
  ) {
    state.articleCountByMonth = articleCountByMonth
  },
  M_SET_ATTILCECOUNTAXIS(state: State, articleCountAxis: string[]) {
    state.articleCountAxis = articleCountAxis
  },
  M_SET_ARTICLEPVTOP5(state: State, articlePvTop5: SeriesDataForLineAndBar) {
    state.articlePvTop5 = articlePvTop5
  },
  M_SET_ARTICLEPVTOP5AXIS(state: State, articlePvTop5Axis: string[]) {
    state.articlePvTop5Axis = articlePvTop5Axis
  },
  M_SET_SUMMARYDATA(state: State, data: SummaryData) {
    state.summaryData = data
  }
}
export const actions: ActionTree<State, Root> = {
  async getArticleGroupByCategory({ commit }) {
    try {
      const res: any = await http.get('dashboard/getArticleGroupByCategory')
      let data: SeriesDataForPie[] = []
      if (res && res.length) {
        data = res.map(item => {
          return {
            name: item.name,
            value: Number(item.value)
          }
        })
      }
      commit('M_SET_ARTICLEGROUPBYCATEGORY', data)
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async getDailyPvUv({ commit }, { begin, end }) {
    try {
      const res: any = await http.get('dashboard/getDailyPvUv', {
        params: { begin, end }
      })
      const dateArr = res.pv.map(i => {
        return dayjs(i.name).format('YYYY-MM-DD')
      })
      const pvData = res.pv.map(i => {
        return Number(i.value)
      })
      const uvData = res.uv.map(i => {
        return Number(i.value)
      })
      commit('M_SET_DAILYPV', { data: pvData, name: 'pv' })
      commit('M_SET_DAILYUV', { data: uvData, name: 'uv' })
      commit('M_SET_PVUVAXIS', dateArr)
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async getArticleCountByMonth({ commit }, { begin, end }) {
    try {
      const res: any = await http.get('dashboard/getArticleCountByMonth', {
        params: { begin, end }
      })
      const dateArr = res.map(i => {
        return dayjs(i.name).format('YYYY-MM')
      })
      const data = res.map(i => {
        return Number(i.value)
      })
      commit('M_SET_ARTICLECOUNTBYMONTH', { data: data, name: '文章数' })
      commit('M_SET_ATTILCECOUNTAXIS', dateArr)
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async getTop5Article({ commit }) {
    try {
      const res: any = await http.get('dashboard/getTop5Article')
      const axis = res.map(i => {
        return i.name
      })
      const data = res.map(i => {
        return Number(i.value)
      })
      commit('M_SET_ARTICLEPVTOP5', { data: data, name: '阅读量' })
      commit('M_SET_ARTICLEPVTOP5AXIS', axis)
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async getSummaryData({ commit }) {
    try {
      const res: any = await http.get('dashboard/getSummaryData')
      commit('M_SET_SUMMARYDATA', res)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const namespaced = true
