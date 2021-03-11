import { Options } from '@/model/common'
import { Model } from '@/model/crud'
import { dirty } from '@/utils/util'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { State as Root } from '..'

export interface State<T> {
  /**
   * 当前对象列表
   */
  items?: T[]
  /**
   * 当前页索引
   */
  index?: number
  /**
   * 每页数量
   */
  size?: number
  /**
   * 当前列表总记录数
   */
  total?: number
  /**
   * 当前选中对象
   */
  current?: T
}

interface Options<T> {
  /**
   * 额外actions
   */
  actions?: ActionTree<State<T>, Root>
  /**
   * 额外mutations
   */
  mutations?: MutationTree<State<T>>
  /**
   * 额外getters
   */
  getters?: GetterTree<State<T>, Root>
}
export default function create<T extends { id: string | number; extra?: any }>(
  model: Partial<Model<T>>,
  options?: Options<T>
): Module<State<T>, Root> {
  const { actions = {}, mutations = {}, getters = {} } = options || ({} as any)
  return {
    namespaced: true,
    state: () => ({
      items: null,
      index: 1,
      size: 10,
      total: null,
      filter: null,
      current: null,
      options: null
    }),
    getters: {
      ...getters,
      /**
       * 是否已加载完全
       */
      complete: state =>
        state.total != null && state.items && state.items.length >= state.total,
      /**
       * 当前页码(基于1)
       */
      index: state => state.index,
      /**
       * 总页数
       */
      total: state => state.total || 0,
      /**
       * 是否无记录
       */
      empty: state => state.total === 0
    },
    mutations: {
      ...mutations,
      setList(state, { items, index, total }) {
        state.items = items
        state.index = index
        state.total = total
      },
      setCurrent(state, item: T) {
        state.current = item
      },
      setIndex(state, value) {
        state.index = value
      },
      setSize(state, value) {
        state.size = value
      }
    },
    actions: {
      /**
       * 获取列表
       */
      async list({ commit, state }) {
        const options: Options.ListOptions = {
          index: state.index,
          size: state.size
        }
        const res = await model.list(options)
        commit('setList', {
          items: res.list,
          index: res.index,
          total: res.total
        })
      },
      /**
       * 跳到指定页码
       * @param index 页码(基于1)
       */
      async jump({ dispatch, commit }, index: number) {
        commit('setIndex', index)
        await dispatch('list')
      },
      /**
       * 调整单页数量
       * @param size 数量
       */
      async resize({ dispatch, commit }, size: number) {
        commit('setSize', size)
        commit('setIndex', 1)
        await dispatch('list')
      },
      /**
       * 获取对象
       * @param id ID
       */
      async get({ commit }, id: string | number) {
        const res = await model.get(id)
        commit('setCurrent', res)
      },
      /**
       * 更新对象
       * @param data 数据
       */
      async update({ state, dispatch }, data: Partial<T>) {
        const current = state.current
        if (!current) {
          throw new Error('当前对象不存在')
        }
        delete data.id
        delete data.extra
        console.log(current, data)
        const payload = dirty(current, data)
        console.log(payload)
        if (payload) {
          await model.update(current.id, payload)
          await dispatch('get', current.id)
          return true
        }
      },
      /**
       * 创建对象
       * @param data 数据
       */
      async add({ dispatch }, data: Partial<T>) {
        delete data.id
        delete data.extra
        const item = await model.add(data)
        await dispatch('get', item)
        return item
      },
      /**
       * 创建初始对象
       */
      async draft({ commit }) {
        commit('setCurrent', {})
      },
      /**
       * 删除对象
       */
      async remove({ commit, dispatch }, id: number) {
        if (!id) {
          throw new Error('当前对象不存在')
        }
        await model.remove(id)
        commit('setCurrent', null)
        commit('setIndex', 1)
        await dispatch('list')
      },
      /**
       * 重置当前项
       */
      resetCurrent({ commit }) {
        commit('setCurrent', null)
      },
      /**
       * 重置列表
       */
      resetList({ commit }) {
        commit('setList', {
          items: null,
          index: 1,
          total: null
        })
        commit('setSize', 10)
      },
      /**
       * 重置全部
       */
      reset({ dispatch }) {
        dispatch('resetCurrent')
        dispatch('resetList')
      },
      ...actions
    }
  }
}
