/** @format */

export function Catch(
  target: Record<string, any>,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  descriptor.value = Catch.wrap(descriptor.value)
}

export namespace Catch {
  export function wrap<T extends Function>(func: T): T {
    return async function (this: Vue, ...args: any[]) {
      try {
        return await func.apply(this, args)
      } catch (e) {
        this.$message.error(e.message)
      }
    } as any
  }
}
