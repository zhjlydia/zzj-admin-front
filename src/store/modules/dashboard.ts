/** @format */
import http from '@/apis'
import { SeriesDataForPie } from '@/model/chart'
import { ActionTree, MutationTree } from 'vuex'
import { State as Root } from '..'

export interface State {
  articleGroupByCategory: SeriesDataForPie[]
}

export const state: State = {
  articleGroupByCategory: null
}

export const mutations: MutationTree<State> = {
  M_SET_ARTICLEGROUPBYCATEGORY(
    state: State,
    articleGroupByCategory: SeriesDataForPie[]
  ) {
    state.articleGroupByCategory = articleGroupByCategory
  }
}
export const actions: ActionTree<State, Root> = {
  async getArticleGroupByCategory({ commit }) {
    const res: any = await http.get('statistics/getArticleGroupByCategory')
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
  }
}

export const namespaced = true
