import http from '@/apis'
/** @format */
import Category from './category'
import { PagenationData, SelectOptions } from './common'
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
    tagIds?: number[]
    options:Record<string,SelectOptions[]>
  }  
  export const Actions={
    ...crud<Article.Item>('/article'),
    async getWithOptions(id:number|string):Promise<Article.Item>{
      const res: Article.Item = (await http.get(`/article/${id}`)) as any
      if(!res) {
        return res
      }
      res.categoryId=res.category?res.category.id:null;
      res.tagIds=res.tags?res.tags.map((item)=>{return item.id}):[];
      const categories:PagenationData<Category.Item>=(await http.get('/category/all',{ params: {index:1,size:1000,module:'article'} })) as any
      const categoryOptions=categories.list.map((item:Category.Item)=>{
        return {
          label:item.title,
          value:item.id
        }
      })
      const tags:PagenationData<Tag.Item>=(await http.get('/tag/all',{ params: {index:1,size:1000} })) as any
      const tagOptions=tags.list.map((item:Tag.Item)=>{
        return {
          label:item.content,
          value:item.id
        }
      })
      res.options={
        category:categoryOptions,
        tag:tagOptions
      }
      return res
    }
  }
}


export default Article
