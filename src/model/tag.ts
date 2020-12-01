import crud from './crud'

export interface Tag {
  id: number
  content: string
  module: string
}
export const TagActions = crud<Tag>('/tag')
