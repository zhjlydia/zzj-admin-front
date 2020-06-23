/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Article from '@/model/Article'
import {PaginationData} from '@/model/common'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  articles: Article[]
  index: number
  size: number
  total: number
}

export const state: State = {
  articles: [],
  index: 1,
  size: 10,
  total: 0
}

export const mutations: MutationTree<State> = {
  M_SET_ARTICLES(state: State, articles: Article[]) {
    state.articles = articles
  },
  M_SET_PAGE(state: State, {index, size, total}) {
    if (index !== undefined) {
      state.index = index
    }
    if (size !== undefined) {
      state.size = size
    }
    if (total !== undefined) {
      state.total = total
    }
  }
}
export const actions: ActionTree<State, Root> = {
  async getArticles({state, commit}) {
    const res: PaginationData<Article.RawData> = await http.get('article/all', {
      params: {index: state.index + 1, size: state.size}
    })
    let articles: Article[] = res.list
      ? res.list.map((item: Article.RawData) => {
          return new Article(item)
        })
      : []
    commit('M_SET_ARTICLES', articles)
    commit('M_SET_PAGE', {index: res.index, size: res.size, total: res.total})
  }
}

export const namespaced = true
