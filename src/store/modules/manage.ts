import Article from '@/model/article'
import Category from '@/model/category'
import Project from '@/model/project'
import Tag from '@/model/tag'
import crud from './crud'

export default {
  article: crud(Article.Actions),
  tag: crud(Tag.Actions),
  category: crud(Category.Actions),
  project: crud(Project.Actions)
}
