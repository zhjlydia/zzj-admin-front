import crud from './crud'
import User from './user'

export namespace Project{
    export interface Item {
        id: number
        title: string
        description: string
        image:string
        content: string
        github:string
        role:string
        url:string
        tags:string
        startedAt:Date
        endedAt:Date
        createdAt: Date
        updatedAt: Date
        author: User
        category: Project.Item
        categoryId?: number
    }  
    export const Actions=crud<Project.Item>('/project')
  }
export default Project
