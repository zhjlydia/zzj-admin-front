/** @format */
class Classification {
  id: number
  title: string
  description?: string
  createdAt?: string
  updatedAt?: string
  constructor(data: Classification.RawData) {
    this.id = data.id
    this.title = data.title
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

namespace Classification {
  export interface RawData {
    id: number
    title: string
    description?: string
    createdAt?: string
    updatedAt?: string
  }
}

export default Classification
