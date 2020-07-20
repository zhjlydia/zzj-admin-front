/** @format */
import dayjs from 'dayjs'
import User from './user'
import Category from './category'
import Tag from './tag'

class Article {
  id: number
  title: string
  description: string
  content: string
  createdAt: string
  updatedAt?: string
  author?: User
  category?: Category
  tags?: Tag[]
  constructor(data: Article.RawData) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.content = data.content
    this.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')
    this.updatedAt = dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')
    this.author = new User(data.author)
    this.category = new Category(data.category)
    this.tags = data.tags.map(item => {
      return new Tag(item)
    })
  }
}

namespace Article {
  export interface RawData {
    id: number
    title: string
    description: string
    content: string
    createdAt: Date
    updatedAt: Date
    author: User.RawData
    category: Category.RawData
    tags: Tag[]
  }
  export class ArticleVo {
    title: string
    description: string
    content: string
    categoryId?: number
    tags: number[] = []
  }
}

export default Article
