import UserService from '@/services/user'
import {setStoreState} from '../../utils'
import {ActionContext} from 'vuex'
import {StateType} from '@/types'
type userContext = ActionContext<StateType['user'], StateType>
const userActions = {
  async getUserInfo(): Promise<any> {
    try {
      let user: any = null
      user = await UserService.getUserInfo()
      setStoreState('user', 'user', user.userInfo)
      return user.userInfo
    } catch (error: any) {
      console.log(error)
      setStoreState('user', 'user', {})
      throw error
    }
  },
  async editName(context: userContext, content: string): Promise<any> {
    try {
      const res = await UserService.editName({content})
      return res
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },

  async editUserAppear(
    context: userContext,
    params: {headImagId: string; coatImagId: string; trousersImagId: string},
  ): Promise<any> {
    try {
      const user = Object.assign({}, context.state.user, params)
      setStoreState('user', 'user', user)

      const data = await UserService.modifyUserInfo(params)
      return data
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async sendSmsCode(context: userContext, params: object): Promise<any> {
    try {
      const res = await UserService.sendSmsCode(params)
      return res
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async checkSmsCode(context: userContext, params: object): Promise<any> {
    try {
      const res = await UserService.checkSmsCode(params)
      return res
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async setAvatar(context: userContext, params: object): Promise<any> {
    try {
      setStoreState('user', 'avatar', params)
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
}

type UserActionsType = typeof userActions

export {UserActionsType}
export default userActions
