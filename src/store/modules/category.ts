/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Category from '@/model/category'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  categories : Category[]
  loading : boolean
}

export const state : State = {
    categories: [],
    loading: false
  }

  export const mutations : MutationTree < State > = {
      M_SET_CATEGORIES(state : State, categories : Category[]) {
        state.categories = categories
      },
      M_SET_LOADING(state : State, loading : boolean) {
        state.loading = loading
      }
    }
    export const actions : ActionTree < State,
      Root > = {
        async fetchList({state, commit}) {
          commit('M_SET_LOADING', true)
          const res : Category.RawData[] = await http.get('category/all')
          let categories : Category[] = res
            ? res.map((item : Category.RawData) => {
              return new Category(item)
            })
            : []
          commit('M_SET_LOADING', false)
          commit('M_SET_CATEGORIES', categories)
        },
        async submit({
          state
        }, data : Category.CategoryVo) {
          if (data.id) {
            return http.put(`category/${data.id}`, {
              title: data.title,
              description: data.description
            })
          }
          return http.post(`category`, {
            title: data.title,
            description: data.description
          })
        },
        async delete({
          state
        }, id : number) {
          if (!id) {
            throw new Error('请选择要删除的类目')
          }
          return http.delete(`category/${id}`)
        }
      }

    export const namespaced = true
