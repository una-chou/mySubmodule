/**
 * @Author: yang_han (yang_han@gotin.online)
 * @Date:   2022-02-15 06:34:38
 */
import NimService from '@/services/nim'
import {setStoreState} from '../../utils'
import {StateType} from '@/types/index'
import _ from 'lodash'
// import Store from '@/store'
import {ActionContext} from 'vuex'
type actionContext = ActionContext<StateType['nim'], StateType>
const nimActions = {
  async auth(context:actionContext): Promise<any> {
    try {
      setStoreState('nim', 'loading', true)
      const authInfo = await NimService.auth()
      // Store.state.user.user
      setStoreState('nim', 'loading', false)
      setStoreState('nim', 'mineInfo', authInfo)
    } catch (error) {
      console.log(error)
      setStoreState('nim', 'loading', false)
      throw error
    }
  },
  async getUsers(context:actionContext, accids: string[]): Promise<any> {
    try {
      const users: any = context.state.users
      const filteredAccids: string[] = []
      const virtualUsers: any = {}
      accids.forEach(accid => {
        if (!users[accid]) {
          filteredAccids.push(accid)
          virtualUsers[accid] = {}
        }
      })

      if (filteredAccids.length === 0) {
        return
      }
      setStoreState('nim', 'users', {...users, ...virtualUsers})
      const ret = await NimService.getUsersByAccids(filteredAccids)
      setStoreState('nim', 'users', {...users, ..._.keyBy(ret, 'im.accid')})
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

type NimActionsType = typeof nimActions

export {NimActionsType}
export default nimActions
