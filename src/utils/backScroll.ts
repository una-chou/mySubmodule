enum keys {
  'newview/home',
}
/**
 * - key : 唯一标识 必须是 keys 中的值
 *  - node : 滚动包裹
 *  - value : 记录值
 */
const state: {
  [index: string]: {
    value: number
    nodeTag: string
    contextNodeTag: string
  }
} = {}
const set = (key: keys, nodeTag: string, contextNodeTag: string) => {
  const node = document.querySelector(nodeTag) as HTMLElement;
  state[key] = {
    value: node.scrollTop,
    nodeTag,
    contextNodeTag,
  }
}
const watch = (key: keys) => {
  if (!state[key]) {
    return
  }
  const {value, nodeTag, contextNodeTag} = state[key]
  if (nodeTag) {
    setTimeout(() => {
      const contextNode = document.querySelector(contextNodeTag) as HTMLElement;
      contextNode && (contextNode.style.minHeight = window.innerHeight + value + 'px')
      const node = document.querySelector(nodeTag) as HTMLElement;
      node && (node.scrollTop = value)
    }, 0)
  }
}

export default {
  watch,
  set,
  keys,
}
