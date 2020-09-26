import { RawLocation } from 'vue-router'

export interface Property {
  id: number
  key: string
  name: string
  type: Property.Type
  array?: boolean
  readonly?: boolean
  hidden?: boolean | ((value?: any) => any)
  serializer?: Property.Serializer
  deserializer?: Property.Deserializer
  router?: Property.Router
  options?: Record<string, any>
  props?: Property[]
}
export declare namespace Property {
  type Type =
    | 'string'
    | 'number'
    | 'bool'
    | 'date'
    | 'textarea'
    | 'json'
    | 'color'
    | 'image'
    | 'video'
    | 'object'
    | 'enum'
    | 'file'
    | 'html'
    | 'editor'
  type Router = RawLocation
  type Serializer = (value: any, raw: any) => any
  type Deserializer = (value: any) => any
}

export interface Row extends Property {
  viewComp: string
  editComp: string
  isHidden: boolean
}
