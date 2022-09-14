/**
 * @Author: yang_han (yang_han@gotin.online)
 * @Date:   2021-06-09 07:50:20
 */
import AuthService from '@/services/auth'
import {setStoreState} from '../../utils'
import {ActionContext} from 'vuex'
import { StateType } from '@/types'
type actionContext = ActionContext<StateType['auth'], StateType>
const authActions = {
  async create(data: any): Promise<any> {
    try {
      const tokenInfo = await AuthService.create(data)
      setStoreState('auth', 'token', tokenInfo)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async getAuthSns(context:actionContext, params: any): Promise<any> {
    try {
      const sns = await AuthService.getAuthSns(params)
      console.log('getAuthSns', sns)
      return sns
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

type AuthActionsType = typeof authActions

export {AuthActionsType}
export default authActions
