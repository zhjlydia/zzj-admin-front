import crud from './crud'

export namespace Tag{
  export interface Item {
    id: number
    content: string
    module: string
  }  
  export const Actions=crud<Tag.Item>('/tag')
}
export default Tag
