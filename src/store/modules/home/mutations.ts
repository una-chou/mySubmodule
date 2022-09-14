/**
 * @Author: Ali (Ali@gotin.online)
 * @Date:   2022-08-09 10:34:33
 */
export default {
  __set(state: any, msg: {key: string; val: any}): void {
    state[msg.key] = msg.val
  },
}
