/**
 * 使用自定义时间间隔限制方法执行频率
 *
 * @param limit 时间间隔(ms)
 */
export function Throttle(limit: number): MethodDecorator
/**
 * 使用默认时间间隔限制方法执行频率
 */
export function Throttle(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void
export function Throttle(...args: any[]): any {
  if (args.length === 3) {
    args[2].value = Throttle.wrap(args[2].value)
  } else {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      descriptor.value = Throttle.wrap(args[0], descriptor.value)
    }
  }
}

export namespace Throttle {
  /**
   * 使用默认时间间隔限制方法执行频率
   *
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(func: T): T
  /**
   * 使用自定义时间间隔限制方法执行频率
   *
   * @param limit 时间间隔(ms)
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(limit: number, func: T): T
  export function wrap(arg1: number | Function, arg2?: Function): any {
    let limit: number
    let func: Function
    if (typeof arg1 === 'number') {
      limit = arg1
      func = arg2
    } else {
      func = arg1
    }
    let disabled: boolean
    return function(this: any, ...args: any[]) {
      if (disabled) {
        console.log('throttled...')
      } else {
        const res = func.apply(this, args)
        disabled = true
        setTimeout(() => {
          disabled = false
        }, limit || 1000)
        return res
      }
    }
  }
}


/**
 * 使用自定义延迟时间限制方法执行次数
 *
 * @param delay 延迟(ms)
 */
export function Debounce(delay: number): MethodDecorator
/**
 * 使用默认延迟时间限制方法执行次数
 */
export function Debounce(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void
export function Debounce(...args: any[]): any {
  if (args.length === 3) {
    args[2].value = Debounce.wrap(args[2].value)
  } else {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      descriptor.value = Debounce.wrap(args[0], descriptor.value)
    }
  }
}

export namespace Debounce {
  /**
   * 使用自定义延迟时间限制方法执行次数
   *
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(func: T): T
  /**
   * 使用默认延迟时间限制方法执行次数
   *
   * @param delay 延迟时间(ms)
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(delay: number, func: T): T
  export function wrap(arg1: number | Function, arg2?: Function): any {
    let delay: number
    let func: Function
    if (typeof arg1 === 'number') {
      delay = arg1
      func = arg2
    } else {
      func = arg1
    }
    let timer: any
    return function(this: any, ...args: any[]) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), delay || 1000)
      console.log('debounced...')
    }
  }
}