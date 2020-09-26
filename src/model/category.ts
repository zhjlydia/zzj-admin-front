import crud from './crud'

export namespace Category{
  export interface Item {
    id: number
    title: string
    description: string
    createdAt?: string
    updatedAt?: string
  }  
  export const Actions=crud<Category.Item>('/category')
}
export default Category
