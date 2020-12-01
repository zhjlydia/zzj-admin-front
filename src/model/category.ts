import crud from './crud'

export interface Category {
  id: number
  title: string
  module: string
  description: string
  createdAt?: string
  updatedAt?: string
}
export const CategoryActions = crud<Category>('/category')
