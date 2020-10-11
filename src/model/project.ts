import http from '@/apis'
import Category from './category'
import { PagenationData, SelectOptions } from './common'
import crud from './crud'
import Tag from './tag'
import User from './user'

export namespace Project{
    export interface Item {
        id: number
        name: string
        description: string
        image:string
        content: string
        github:string
        role:string
        url:string
        startedAt:Date
        endedAt:Date
        createdAt: Date
        updatedAt: Date
        author: User
        category: Category.Item
    categoryId?: number
    tags: Tag.Item[]
    tagIds?: number[]
    extra?:Record<string,SelectOptions[]>
    }  
    export const Actions={
      ...crud<Project.Item>('/project'),
      async getOptions():Promise<Record<string,SelectOptions[]>>{
        const categories:PagenationData<Category.Item>=(await http.get('/category/all',{ params: {index:1,size:1000,module:'project'} })) as any
        const categoryOptions=categories.list.map((item:Category.Item)=>{
          return {
            label:item.title,
            value:item.id
          }
        })
        const tags:PagenationData<Tag.Item>=(await http.get('/tag/all',{ params: {index:1,size:1000,module:'project'} })) as any
        const tagOptions=tags.list.map((item:Tag.Item)=>{
          return {
            label:item.content,
            value:item.id
          }
        })
        return {
          category:categoryOptions,
          tag:tagOptions
        }
      },
      async getWithOptions(id:number|string):Promise<Project.Item>{
        const res: Project.Item = (await http.get(`/project/${id}`)) as any
        if(!res) {
          return res
        }
        res.categoryId=res.category?res.category.id:null;
        res.tagIds=res.tags?res.tags.map((item)=>{return item.id}):[];
        const options = await this.getOptions()
        res.extra = options
        return res
      }
    }
  }
export default Project
