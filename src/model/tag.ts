/** @format */
class Tag {
  id : number
  content : string
  constructor(data : Tag.RawData) {
    this.id = data.id
    this.content = data.content
  }
}

namespace Tag {
  export interface RawData {
    id : number
    content : string
  }
  export interface TagVo {
    id?: number
    content : string
  }
}

export default Tag
