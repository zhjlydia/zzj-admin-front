import http from '@/apis'
import { Options, PagenationData } from '@/model/common'

export interface Model<T> {
  /**
   * 获取列表
   * @param options 参数
   */
  list(options?: Options.Pagination): Promise<PagenationData<T>>

  /**
   * 获取对象
   * @param id ID
   */
  get(id: string | number): Promise<T>

  /**
   * 更新对象
   * @param id ID
   * @param data 数据
   */
  update(id: string | number, data: Partial<T>): Promise<void>

  /**
   * 添加对象
   * @param data 数据
   */
  add(data: Partial<T>): Promise<T>

  /**
   * 删除对象
   * @param id ID
   */
  remove(id: string | number): Promise<void>
}

function create<T>(endpoint: string): Model<T>
function create<T>(endpoint?: string): Partial<Model<T>> | Function {
  if (endpoint === undefined) {
    return create
  }
  const model: Partial<Model<T>> = {}
  model.add = data => http.post(endpoint, data) as any
  model.remove = id => http.delete(`${endpoint}/${id}`) as any
  model.update = (id, data) => http.put(`${endpoint}/${id}`, data) as any
  model.list = opts => http.get(`${endpoint}/all`, { params: opts }) as any
  model.get = id => http.get(`${endpoint}/${id}`) as any
  return model
}

export default create
