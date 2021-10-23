import normalizeWheel from 'normalize-wheel-es'

import type { ObjectDirective, DirectiveBinding } from 'vue'

const isFirefox =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().includes('firefox')

const mousewheel = function (element, callback) {
  if (element && element.addEventListener) {
    const fn = function (event) {
      const normalized = normalizeWheel(event)
      callback && Reflect.apply(callback, this, [event, normalized])
    }
    if (isFirefox) {
      element.addEventListener('DOMMouseScroll', fn)
    } else {
      element.onmousewheel = fn
    }
  }
}

const Mousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    mousewheel(el, binding.value)
  },
}

export default Mousewheel
