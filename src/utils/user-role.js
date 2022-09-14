// 传入功能模块，获取用户有没有此模块的操作权限
// 使用步骤：
// 1.在项目拿到user信息后的第一时间，调用init函数
// 2.在项目拿到event信息后，根据需要调用getEventRole
//   2.1 在调用过getEventRole之后，如果还需要重复获取身份(比如子组件)，这时调用canUse即可
// 3.在进入场次拿到session信息后，根据需要调用getSessionRole
//   3.1 在调用过getSessionRole之后，如果还需要重复获取身份(比如子组件)，这时调用canUse即可
// 示例
// import newUserRole from '@/utils/user-role'
// newUserRole.init(user.value.userId, process.env.VUE_APP_CREATOR_URL, ApiClient)
// const flag1 = await newUserRole.getSessionRole(singleSession.value.uuid, 'module')
// const flag2 = newUserRole.canUse('xxx', 'session')


const userRole = {
  userId: '',
  apiHost: '',
  api: null,
  eventRole: [],
  sessionRole: [],
  allModules: {
    IMAdmin: ['e3', 'e4', 's3', 's4'],
    announcementAdmin: ['e3', 'e4', 's3', 's4'],
    pollAdmin: ['e3', 'e4', 's3', 's4', 's10'],
    inviteToStage: ['s10'],
    earlyEntryForum: ['s2', 's10'],
    startLive: ['s10']
  },
  // uid用户userId(非hash)，host(权限接口的前置host)，api(项目使用的ajax对象，一般是咱们内部封装过一次的)
  init(uid, host, api){
    this.userId = uid
    this.apiHost = host
    this.api = api
  },
  // 初始化获取用户event级别的权限，可以附带返回module是否可用
  async getEventRole(uuid, module){
    let flag = false
    await this.api.get(`${this.apiHost}/event/roles/${this.userId}/${uuid}`).then(res => {
      res = res.data ? (res.data.data ? res.data.data : res.data) : res
      this.eventRole = res.map((item) => {
        return 'e' + item
      })
      flag = module && this.canUse(module, 'event')
    })
    return flag
  },
  // 初始化获取用户session级别的权限，可以附带返回module是否可用
  async getSessionRole(uuid, module){
    let flag = false
    await this.api.get(`${this.apiHost}/session/roles/${this.userId}/${uuid}`).then(res => {
      res = res.data ? (res.data.data ? res.data.data : res.data) : res
      this.sessionRole = res.map((item) => {
        return 's' + item
      })
      flag = module && this.canUse(module, 'session')
    })
    return flag
  },
  // 功能模块用户是否可用，module可以是单个字符串(返回boolean)，也可以是字符串数组(返回boolean类型的数组)，type就是event或者session
  canUse(module, type) {
    const roleList = type === 'event' ? this.eventRole : this.sessionRole
    if (module && typeof module === 'string') {
      const arr = roleList.filter((val)=>{
        try {
          return this.allModules[module].includes(val)
        } catch (error) {
          throw new Error(`无${module}模块！！！`)
        }
      })
      return !!arr.length
    } else if (module) {
      const list = module.map((m)=>{
        const arr = roleList.filter((val)=>{
          try {
            return this.allModules[m].includes(val)
          } catch (error) {
            throw new Error(`无${m}模块！！！`)
          }
        })
        return !!arr.length
      })
      return list
    }
  },
  // 获取用户身份里最高级的那个身份，一般用于tag显示，参数为后端返回的身份列表，number的数组
  // 主办方 > 主持人 > 嘉宾 > 参会者
  // 使用举例
  // const tagStr = userRole.getTag(list)
  // <span v-if="tagStr" :class="tagStr">{{ t(`session.poll.${tagStr}`) }}</span>
  getTag(roleList) {
    if (roleList) {
      if (roleList.indexOf(3) > -1 || roleList.indexOf(4) > -1) {
        return 'organizer'
      } else if (roleList.indexOf(10) > -1) {
        return 'host'
      } else if (roleList.indexOf(2) > -1) {
        return 'guest'
      } else if (roleList.indexOf(1) > -1) {
        return ''
      }
    } else {
      return ''
    }
  },
  // 获取用户身份里最高级的那个数字身份
  getRoleNumber(roleList) {
    if (roleList) {
      if (roleList.indexOf(3) > -1) {
        return 3
      } else if (roleList.indexOf(4) > -1) {
        return 4
      } else if (roleList.indexOf(10) > -1) {
        return 10
      } else if (roleList.indexOf(2) > -1) {
        return 2
      } else if (roleList.indexOf(1) > -1) {
        return 1
      }
    } else {
      return 1
    }
  }
}
export default userRole
