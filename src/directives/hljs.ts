/** @format */

import hljs from 'highlight.js'

import {DirectiveOptions} from 'vue'

export const hljsDirective: DirectiveOptions = {
  bind(el) {
    let blocks = el.querySelectorAll('pre code')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  }
}
