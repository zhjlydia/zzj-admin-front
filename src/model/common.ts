export namespace Options {
  interface Filter {
    /**
     * 过滤
     */
    filter?: Record<string, any>
  }
  export interface Pagination {
    /**
     * 页面索引(基于0)
     */
    index?: number
    /**
     * 每页数量上限
     */
    size?: number
  }
  export type ListOptions = Filter & Pagination
}
/**
 * 分页
 */
export interface PagenationData<T> extends Options.Pagination {
  /**
   * 数据列表
   */
  list: T[]
  /**
   * 总数
   */
  total: number
}
/**
 * 列表
 *
 * @format
 */

export interface PaginationData<T> {
  /**
   * 数据列表
   */
  list: T[]
  /**
   * 当前页数
   */
  index: number
  /**
   * 分页大小
   */
  size: number
  /**
   * 总数
   */
  total: number
}

/**
 * 翻页选项
 */
export interface PaginationOptions {
  /**
   * 页面索引
   */
  index?: number
  /**
   * 页面容量
   */
  size?: number
}

export interface SelectOptions {
  label: string
  value: number | string
}

/**
 * 上下架状态
 */
export enum StateEnum {
  /**
   * 上架
   */
  UP = 1,
  /**
   * 下架
   */
  DOWN = 2
}
