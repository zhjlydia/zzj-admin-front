/** @format */
import http from '@/apis'
import User from '@/model/user'
import { setToken } from '@/plugins/cookies'
import { ActionTree, MutationTree } from 'vuex'
import { State as Root } from '..'

export interface State {
  user: User
  token: string
}

export const state: State = {
  user: null,
  token: ''
}

export const mutations: MutationTree<State> = {
  M_SET_USER(state: State, user: User) {
    state.user = user
  },
  M_SET_TOKEN(state: State, token: string) {
    state.token = token
  }
}
export const actions: ActionTree<State, Root> = {
  async login({commit}, {email, password}) {
    const res: string = await http.post('user/login', {email: email.trim(), password: password.trim()})
    const token = res
    setToken(token)
    commit('M_SET_TOKEN', token)
  },
  async logout({commit}) {
    const token = ''
    setToken(token)
    commit('M_SET_TOKEN', token)
    commit('M_SET_USER', null)
  },
  async getUser({commit}) {
    const res: User = await http.get('user')
    commit('M_SET_USER', res)
  }
}

export const namespaced = true
