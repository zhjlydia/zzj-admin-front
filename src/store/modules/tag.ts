/** @format */
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import Tag from '@/model/tag'
import {State as Root} from '..'
import http from '@/apis'

export interface State {
  tags : Tag[]
  loading : boolean
}

export const state : State = {
    tags: [],
    loading: false
  }

  export const mutations : MutationTree < State > = {
      M_SET_TAGS(state : State, tags : Tag[]) {
        state.tags = tags
      },
      M_SET_LOADING(state : State, loading : boolean) {
        state.loading = loading
      }
    }
    export const actions : ActionTree < State,
      Root > = {
        async fetchList({state, commit}) {
          commit('M_SET_LOADING', true)
          const res : Tag.RawData[] = await http.get('tag/all')
          let tags : Tag[] = res
            ? res.map((item : Tag.RawData) => {
              return new Tag(item)
            })
            : []
          commit('M_SET_LOADING', false)
          commit('M_SET_TAGS', tags)
        },
        async submit({
          state
        }, data : Tag.TagVo) {
          if (data.id) {
            return http.put(`tag/${data.id}`, {content: data.content})
          }
          return http.post(`tag`, {content: data.content})
        },
        async delete({
          state
        }, id : number) {
          if (!id) {
            throw new Error('请选择要删除的类目')
          }
          return http.delete(`tag/${id}`)
        }
      }

    export const namespaced = true
