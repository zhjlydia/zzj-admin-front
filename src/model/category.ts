/** @format */
class Category {
  id?: number
  title?: string
  description?: string
  createdAt?: string
  updatedAt?: string
  constructor(data : Category.RawData) {
    this.id = data.id || 0
    this.title = data.title || ''
    if (data.description) {
      this.description = data.description
    }
    if (data.createdAt) {
      this.createdAt = data.createdAt
    }
    if (data.updatedAt) {
      this.updatedAt = data.updatedAt
    }
  }
}

namespace Category {
  export interface RawData {
    id : number
    title : string
    description?: string
    createdAt?: string
    updatedAt?: string
  }
  export interface CategoryVo {
    id : number;
    title : string
    description?: string
  }
}

export default Category
