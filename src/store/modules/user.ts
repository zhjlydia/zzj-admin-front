/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {getToken, setToken, removeToken} from '@/plugins/cookies'
import User from '@/model/user'
import {State as Root} from '..'
import http from '@/apis'

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
  async getUser({commit}) {
    const res: User.RawData = await http.get('user')
    commit('M_SET_USER', new User(res))
  }
}

export const namespaced = true
