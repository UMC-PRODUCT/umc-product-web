const findScrollableParent = (source: HTMLElement | null) => {
  let node = source
  while (node) {
    const style = window.getComputedStyle(node)
    const isScrollable = /(auto|scroll)/.test(style.overflowY)
    if (isScrollable && node.scrollHeight > node.clientHeight) {
      return node
    }
    node = node.parentElement
  }
  return null
}

export const scrollToTop = (source?: HTMLElement | null) => {
  const target = source ? findScrollableParent(source) : null
  if (target) {
    target.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const scroller = document.scrollingElement
  if (scroller) {
    scroller.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
