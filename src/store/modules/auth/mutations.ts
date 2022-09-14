/**
 * @Author: yang_han (yang_han@gotin.online)
 * @Date:   2021-06-09 07:50:20
 */
export default {
  __set(state: any, msg: {key: string; val: any}): void {
    state[msg.key] = msg.val
  },
}
