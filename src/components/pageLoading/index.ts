import Vue from 'vue'

import PageLoading from './index.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let LoadingInstance: any = null

export interface LoadingOptions {
  left?: number
  top?: number
  show?: boolean
  text?: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function newInstance(): any {
  const div = document.createElement('div')
  div.innerHTML = `<page-loading></page-loading>`
  document.body.appendChild(div)

  const PAGELOADING = new Vue({
    el: div,
    components: { PageLoading }
  }).$children[0]

  return {
    update(o?: LoadingOptions): void {
      if (PAGELOADING && o) {
        Object.assign(PAGELOADING, o)
      }
    },
    destroy(): void {
      document.body.removeChild(div)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLoadingInstance(): any {
  LoadingInstance = LoadingInstance || newInstance()

  return LoadingInstance
}

function update(options?: LoadingOptions): void {
  const instance = getLoadingInstance()

  instance.update(options)
}

declare interface LoadingTypes {
  start: (options?: LoadingOptions) => void
  end: () => void
  destroy: () => void
}

const Loading: LoadingTypes = {
  start(options?: LoadingOptions) {
    update(Object.assign({ show: true }, options || {}))
  },
  end() {
    update({
      show: false
    })
  },
  destroy() {
    const instance = getLoadingInstance()
    instance.destroy()
    LoadingInstance = null
  }
}
export default Loading
