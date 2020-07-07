/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Tag from '@/model/tag'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  tags: Tag[]
  loading: boolean
}

export const state: State = {
  tags: [],
  loading: false
}

export const mutations: MutationTree<State> = {
  M_SET_TAGS(state: State, tags: Tag[]) {
    state.tags = tags
  },
  M_SET_LOADING(state: State, loading: boolean) {
    state.loading = loading
  }
}
export const actions: ActionTree<State, Root> = {
  async fetchList({state, commit}) {
    commit('M_SET_LOADING', true)
    const res: Tag.RawData[] = await http.get('tag/all')
    let tags: Tag[] = res
      ? res.map((item: Tag.RawData) => {
          return new Tag(item)
        })
      : []
    commit('M_SET_LOADING', false)
    commit('M_SET_TAGS', tags)
  }
}

export const namespaced = true
