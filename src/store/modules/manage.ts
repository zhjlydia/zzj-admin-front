import { ArticleActions } from '@/model/article'
import { CategoryActions } from '@/model/category'
import { ProjectActions } from '@/model/project'
import { TagActions } from '@/model/tag'
import crud from './crud'

export default {
  article: crud(ArticleActions, {
    actions: {
      /**
       * 获取对象
       * @param id ID
       */
      async get({ commit }, id: string | number) {
        const res = await ArticleActions.getWithOptions(id)
        commit('setCurrent', res)
      },
      async draft({ commit }) {
        const res = await ArticleActions.getOptions()
        commit('setCurrent', Object.assign({}, { extra: res }))
      }
    }
  }),
  project: crud(ProjectActions, {
    actions: {
      /**
       * 获取对象
       * @param id ID
       */
      async get({ commit }, id: string | number) {
        const res = await ProjectActions.getWithOptions(id)
        commit('setCurrent', res)
      },
      async draft({ commit }) {
        const res = await ProjectActions.getOptions()
        commit('setCurrent', Object.assign({}, { extra: res }))
      }
    }
  }),
  tag: crud(TagActions),
  category: crud(CategoryActions)
}
