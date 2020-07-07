/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Classification from '@/model/classification'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  classifications: Classification[]
  loading: boolean
}

export const state: State = {
  classifications: [],
  loading: false
}

export const mutations: MutationTree<State> = {
  M_SET_CLASSIFICATIONS(state: State, classifications: Classification[]) {
    state.classifications = classifications
  },
  M_SET_LOADING(state: State, loading: boolean) {
    state.loading = loading
  }
}
export const actions: ActionTree<State, Root> = {
  async fetchList({state, commit}) {
    commit('M_SET_LOADING', true)
    const res: Classification.RawData[] = await http.get('classification/all')
    let classifications: Classification[] = res
      ? res.map((item: Classification.RawData) => {
          return new Classification(item)
        })
      : []
    commit('M_SET_LOADING', false)
    commit('M_SET_CLASSIFICATIONS', classifications)
  }
}

export const namespaced = true
