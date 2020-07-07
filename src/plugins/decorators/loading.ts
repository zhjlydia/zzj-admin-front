/** @format */

import Vue from 'vue'
import {Loading as ElLoading} from 'element-ui'

/**
 * 显示自定义加载提示Toast直到目标方法执行完成(成功或失败)
 *
 * @param text 加载提示内容
 */
export function Loading(text: string): MethodDecorator
/**
 * 显示默认加载提示Toast直到目标方法执行完成(成功或失败)
 */
export function Loading(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void
export function Loading(...args: any[]): any {
  if (args.length === 3) {
    args[2].value = Loading.wrap(args[2].value)
  } else {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      descriptor.value = Loading.wrap(args[0], descriptor.value)
    }
  }
}
export namespace Loading {
  /**
   * 显示默认加载提示Toast直到目标方法执行完成(成功或失败)
   *
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(func: T): T
  /**
   * 显示自定义加载提示Toast直到目标方法执行完成(成功或失败)
   *
   * @param text 加载提示内容
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(text: string, func: T): T
  export function wrap(arg1: string | Function, arg2?: Function): any {
    let text: string
    let func: Function
    if (typeof arg1 === 'string') {
      text = arg1
      func = arg2
    } else {
      func = arg1
    }
    return async function (this: Vue, ...args: any[]) {
      let instance = ElLoading.service({fullscreen: true, background: 'rgba(0, 0, 0, 0.6)', text: text || '处理中'})
      try {
        return await func.apply(this, args)
      } finally {
        instance.close()
      }
    }
  }
}
