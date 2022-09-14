const Response: any = {
  DataReceived: '10000', // 客户端请求已接收到(确认收到)
  DataInvalid: '10001', // 客户端请求消息结构不合法
  Invalid: '10002', // 客户端请求的不合法
  SpecieInvalid: '10003', // 客户端请求的Specie不合法
  LogicInvalid: '10010', // 客户端当前请求的业务无法完成(非程序bug)

  Failed: '10011', // 客户端当前请求的业务无法完成(程序bug，比如依赖的服务宕机)
  Permission: '10012', // 客户端没有权限进行当前操作
  ClientLeave: '10020', // 频道内有客户端离开
  OtherActive: '10021', // 当前用户多开tab或多设备
  Destroyed: '11999', // 当前直播已结束，频道已销毁
  NeedLeave: '11998', // 当前用户需要退出直播/观看(踢掉)
  NeedMute: '11997', // 当前用户需要静音(强制)
  NeedVideoDisable: '11996', // 当前用户需要关闭视频流(强制)
  GoToLive: '11995',
  UserRole: '11994', // 查询当前用户身份
  ChannelStatus: '11992', // 客户端检查当前直播频道
  OneOneMatch: '13201', // 当前用户成功匹配到用户
  LengthenOneToOne: '13202', // 用户延长1v1聊天
  OneOneOpenVideo: '13203', // 当前用户开始打开视频
  EndOneOne: '13204', // 当前1v1视频聊天结束
  MatchSuccess: '13105', // 当前1v1匹配成功
  MatchCountDown: '13205', // 当前1v1匹配倒计时
  OntOneLeftTime: '13206', // 当前1v1视频剩余时间
  ReceiveAnCard: '13207', // 1v1聊天期间接到对方名片
  CurrentAttendees: '13208', // 1v1当前未匹配的人数
  GetGuestList: '13301', // 获取上麦嘉宾列表
  GetEmojiNum: '13302', // 收到3个表情变化的数据
  ChangeRaiseOffline: '13304', // 用户被强制下麦
  ChangeRaiseConsent: '13305', // 同意用户上麦
  ChangeRaiseReject: '13306', // 拒绝用户上麦
  CodeShareScreen: '13307', // 主持人嘉宾共享屏幕
  ChangeRaiseLived: '13308', // 嘉宾已上麦
  ResponseLivedOffLive: '13309', // 用户主动下麦
  HostStealth: '13310', // 主持人隐身
  UserRaised: '13311', // 其他人举手，主持人收到信息
  ResponseRaiseCancel: '13312', // 观众/嘉宾请求上麦取消(主持人收到)
  ResponseJoinLiveListFail: '13313', // 主持人取消隐身失败(超过最大上麦人数)
  GetTransition: '13314', // 收到转场的弹窗
  GetNewPoll: '13320', //收到新的投票
  GetSharePoll: '13321', //定期广播推送投屏投票进度
  GetCloseSharePoll: '13322', //投票投屏被关闭
  VisitorIn: '13315', // 场次内有新的参会者加入
  VisitorOut: '13316', // 场次内有参会者离开
  GetInvite: '13317', // 被主持人邀请上麦
  GetFull: '13318', // 被邀请接受时，上麦列表已满
  CloseWs: '-10000', // 关闭长连接

  // 等候室
  ResponseReceivedInvitation: '13325', // 等候室收到主持人邀请 || 主持人主动进入
  ResponseReceivedNotWaitroom: '13326', // 等候室未开启
  ResponseReceivedWaitroomInwaiting: '13332', // 等候室用户等待状态
  ResponseReceivedWaitroomUsers: '13323', // 主持人视角,等候室用户列表
  ResponseReceivedWaitroomUserRemove: '13324', // 主持人移除等候室用户
  ResponseReceivedWaitroomNoPermissions: '13329', // 当前用户刷新 forum 页面是否能进入
  ResponseReceivedWaitroomPermissions: '13330',
  // 分享PDF文档
  CodeLivedShareFile: '13327',        // 接收用户分享文件事件
  CodeLivedShareFileConflict: '13328',// 当前频道正在共享文件，不可同时共享其他文件
}

Object.freeze(Response)

export {Response}
