import http from '@/apis'
import { Category } from './category'
import { PagenationData, SelectOptions } from './common'
import crud from './crud'
import { Tag } from './tag'
import User from './user'

export interface Project {
  id: number
  name: string
  description: string
  image: string
  content: string
  stateText: string
  state: number
  github: string
  role: string
  url: string
  startedAt: Date
  endedAt: Date
  createdAt: Date
  updatedAt: Date
  author: User
  category: Category
  categoryId?: number
  tags: Tag[]
  tagIds?: number[]
  extra?: Record<string, SelectOptions[]>
}
export const ProjectActions = {
  ...crud<Project>('/project'),
  async getOptions(): Promise<Record<string, SelectOptions[]>> {
    const categories: PagenationData<Category> = (await http.get(
      '/category/all',
      { params: { index: 1, size: 1000, module: 'project' } }
    )) as any
    const categoryOptions = categories.list.map((item: Category) => {
      return {
        label: item.title,
        value: item.id
      }
    })
    const tags: PagenationData<Tag> = (await http.get('/tag/all', {
      params: { index: 1, size: 1000, module: 'project' }
    })) as any
    const tagOptions = tags.list.map((item: Tag) => {
      return {
        label: item.content,
        value: item.id
      }
    })
    return {
      category: categoryOptions,
      tag: tagOptions
    }
  },
  async getWithOptions(id: number | string): Promise<Project> {
    const res: Project = (await http.get(`/project/${id}`)) as any
    if (!res) {
      return res
    }
    res.categoryId = res.category ? res.category.id : null
    res.tagIds = res.tags
      ? res.tags.map(item => {
          return item.id
        })
      : []
    const options = await this.getOptions()
    res.extra = options
    return res
  }
}
