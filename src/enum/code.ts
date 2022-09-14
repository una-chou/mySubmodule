const Code: any = {
  // 默认/通用/无角色业务 SpecieDefault
  CheckChannel: '11000', // 客户端检查当前直播频道
  Join: '11001', // 客户端加入
  Leave: '11002', // 客户端退出
  Mute: '11010', // 静音/打开麦克风
  VideoOff: '11010', // 视频开关
  EmojiNum: '11022', // 获取当前3个表情的数值
  userRole: '11033', // 获取用户身份
  CodeShareScreen: '14002', // 主持人嘉宾共享屏幕
  CodeUserCheckLived: '11035', // 当前用户是否已上麦查询

  // 主持人 SpeciePresenter
  ChangeRole: '12000', // 操作更变角色(观众变为嘉宾，嘉宾变为观众？)
  ChangeRaiseConsent: '12001', // 操作上麦(允许)
  ChangeRaiseReject: '12002', // 操作上麦(拒绝) 主持人拒绝嘉宾/观众上麦
  ChangeRaiseOffline: '12003', // 主持人强制给上麦嘉宾下麦
  PresenterAllMute: '12004', // 上麦人员全体静音
  PresenterAllPhonic: '12005', // 上麦人员全体发声
  PresenterMute: '12010', // 上麦人员静音操作
  PresenterVideoOff: '12011', // 上麦人员视频开关操作
  PresenterMuteAndVideoOff: '12012', // 获取静音及上麦人员视频关闭列表
  SetHostStealth: '12013', // 主持人隐身
  GetRaiseList: '12801', // 获取举手列表(只有主持人能看到)
  GetGuestList: '12802', // 获取上麦嘉宾列表(包含上麦嘉宾列表，举手嘉宾和观众列表)
  GoToLive: '12955', // 主持人开始直播
  EndLive: '12956', // 主持人结束直播

  // 观众操作 SpecieAudience
  Raise: '13001', // 用户请求上麦
  SendEmoji: '13002', // 用户发送表情
  CodeOffLived: '14001', // 已上麦用户主动下麦
  RaiseCancel: '13005', // 观众/嘉宾请求上麦取消
  JoinOneToOne: '13101', // 用户加入1v1匹配
  LengthenOneToOne: '13102', // 用户延长1v1聊天
  LeaveOneToOne: '13103', // 用户离开1v1聊天
  EndOneToOne: '13104', // 用户结束1v1聊天
  OneToOneCountdown: '13105', // 1v1开始时间
  OneToOneTimeLeft: '13106', // 1v1剩余时间
  OneToOneSendCard: '13107', // 1v1聊天期间发送名片
  AcceptInvite: '13006', // 用户接受主持人上麦邀请
  RejectInvite: '13007', // 用户拒绝主持人上麦邀请

  // 投票操作 SpecieVote
  CodeVote: '14001', // 用户投票
  CloseWs: '-10000', // 关闭长连接
}

Object.freeze(Code)

export {Code}
