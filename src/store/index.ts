/** @format */

import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree, Store } from 'vuex'
import manage from './modules/manage'
import * as user from './modules/user'

Vue.use(Vuex)

export interface State {
  jobs: number
}

const state: State = {
  jobs: 0
}

const getters: GetterTree<State, State> = {
  pending: state => state.jobs > 0
}

const mutations: MutationTree<State> = {
  begin(state: State) {
    state.jobs++
  },
  end(state: State, error?: Error) {
    state.jobs--
    if (error) {
      console.log(error)
    }
  }
}

const actions: ActionTree<State, State> = {}

export default new Store({
  state,
  mutations,
  actions,
  getters,
  modules: {user, ...manage}
})
