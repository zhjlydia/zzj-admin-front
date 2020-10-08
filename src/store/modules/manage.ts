import Article from '@/model/article'
import Category from '@/model/category'
import Project from '@/model/project'
import Tag from '@/model/tag'
import crud from './crud'

export default {
  article: crud(Article.Actions,{
    actions:{
      /**
       * 获取对象
       * @param id ID
       */
      async get({ commit }, id: string | number) {
        const res = await Article.Actions.getWithOptions(id)
        commit('setCurrent', res)
      },
    }
  }),
  tag: crud(Tag.Actions),
  category: crud(Category.Actions),
  project: crud(Project.Actions)
}
