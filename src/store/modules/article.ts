/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Article from '@/model/article'
import {PaginationData} from '@/model/common'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  id: number
  articles: Article[]
  index: number
  size: number
  total: number
  articleDetail: Article
}

export const state: State = {
  id: 0,
  articles: [],
  index: 1,
  size: 5,
  total: 0,
  articleDetail: null
}

export const mutations: MutationTree<State> = {
  M_SET_ID(state: State, id: number) {
    state.id = id
  },
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
  },
  M_SET_ARTICLE_DETAIL(state: State, articleDetail: Article) {
    state.articleDetail = articleDetail
  }
}
export const actions: ActionTree<State, Root> = {
  async fetchList({state, commit}, index: number) {
    commit('M_SET_PAGE', {index})
    const res: PaginationData<Article.RawData> = await http.get('article/all', {
      params: {index: state.index, size: state.size}
    })
    let articles: Article[] = res.list
      ? res.list.map((item: Article.RawData) => {
          return new Article(item)
        })
      : []
    commit('M_SET_ARTICLES', articles)
    commit('M_SET_PAGE', {index: res.index, size: res.size, total: res.total})
  },
  async fetchDetail({state, commit}) {
    if (!state.id) {
      return
    }
    const res: Article.RawData = await http.get(`article/${state.id}`)
    let articleDetail: Article = new Article(res)
    commit('M_SET_ARTICLE_DETAIL', articleDetail)
  },
  async submit({state}, data: Article.ArticleVo) {
    if (state.id) {
      return http.put(`article/${state.id}`, data)
    }
    return http.post(`article`, data)
  },
  async resetArticleDetail({commit}) {
    commit('M_SET_ARTICLE_DETAIL', null)
  }
}

export const namespaced = true
