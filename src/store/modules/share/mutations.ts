export default {
  __set(state: any, msg: {key: string; val: any}): void {
    state[msg.key] = msg.val
  },
}
