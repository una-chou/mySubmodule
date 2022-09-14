const Scheme: any = {
  LoginBindPhone: '/login/bind/phone', // 登录绑定手机
  NeedLogin: '/user/login', // 用户需要登陆
  FlushLogin: '/user/flush/login', // 用户退出登录后跳转登录
  FlushRefresh: '/user/flush/refresh', // 用户退出登录后刷新
  JumpEvent: '/jump/event?eid=$s', // 用户需要前往活动x eid=x
  JumpSession: '/jump/session?sid=$s', // 用户需要前往日程x sid=x
  BindPhone: '/user/bind/phone', // 用户需前往绑定手机号页面
  BindEmail: '/user/bind/email', // 用户需前往绑定邮箱页面
  Notfound404: '/notfound/404', // 404
  JumpOther: '/jump?url=', // 跳转到url
  JumpQuestion: '/creation/question', // 用户创建主办方需填写问题
  JumpEventPwd: '/jump/event/password', // 活动密码
  JumpSessionPwd: '/jump/session/password', // 场次密码
}

Object.freeze(Scheme)

export {Scheme}
