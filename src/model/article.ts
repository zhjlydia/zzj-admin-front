/** @format */
import Category from './category'
import crud from './crud'
import Tag from './tag'
import User from './user'

export namespace Article{
  export interface Item {
    id: number
    title: string
    description: string
    content: string
    createdAt: Date
    updatedAt: Date
    image?:string
    author: User
    category: Category.Item
    categoryId?: number
    tags: Tag.Item[]
    tagIds: number[]
  }  
  export const Actions=crud<Article.Item>('/article')
}


export default Article
