/** @format */
import dayjs from 'dayjs'
import User from './user'
import Category from './category'

class Project {
  id: number
  title: string
  description: string
  content: string
  github:string
  role:string
  url:string
  tags:string
  createdAt: string
  updatedAt?: string
  startedAt:string
  endedAt:string
  author?: User
  category?: Category
  image?:string
  constructor(data: Project.RawData) {
    this.id = data.id
    this.title = data.title
    this.image = data.image
    this.description = data.description
    this.github = data.github
    this.role = data.role
    this.url = data.url
    this.tags = data.tags
    this.startedAt = dayjs(data.startedAt).format('YYYY-MM-DD HH:mm')
    this.endedAt = dayjs(data.endedAt).format('YYYY-MM-DD HH:mm')
    this.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')
    this.updatedAt = dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')
    this.author = new User(data.author)
    this.category = new Category(data.category)
  }
}

namespace Project {
  export interface RawData {
    id: number
    title: string
    description: string
    content: string
    github:string
    role:string
    url:string
    tags:string
    startedAt:Date
    endedAt:Date
    createdAt: Date
    updatedAt: Date
    author: User.RawData
    category: Category.RawData
    image?:string
  }
  export class ProjectVo {
    title: string
    description: string
    content: string
    github:string
    role:string
    url:string
    tags:string
    startedAt:Date
    endedAt:Date
    categoryId?: number
    image?: string
  }
}

export default Project
