import {UserStateType} from '@/store/modules/user/state'
import {HomeStateType} from '@/store/modules/home/state'
import {GoodsStateType} from '@/store/modules/goods/state'
import {NimStateType} from '@/store/modules/nim/state'
import {AuthStateType} from '@/store/modules/auth/state'
import {ConfigStateType} from '@/store/modules/config/state'
import {TaskStateType} from '@/store/modules/task/state'
import {ShareStateType} from '@/store/modules/share/state'
import {SignStateType} from '@/store/modules/sign/state'
import {LotteryStateType} from '@/store/modules/lottery/state'
import {duckStateType} from '@/store/modules/duck/state'

// vuex state 的模块的类型
type ModuleType = {
  user: UserStateType
  home: HomeStateType
  nim: NimStateType
  auth: AuthStateType
  goods: GoodsStateType
  config: ConfigStateType
  task: TaskStateType
  share: ShareStateType
  sign: SignStateType
  lottery: LotteryStateType
  duck: duckStateType
}

// 所有的StateType
export type StateType = ModuleType
