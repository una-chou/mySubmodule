const Specie: any = {
  // 业务类型范围划分
  Default: 'default', // 默认业务类型
  Audience: 'audience', // 观众 举手、上下麦、申请加入聊天
  Vote: 'vote', // 投票
  Invite: 'invite', // 单约相关操作
  Presenter: 'presenter', // 主持人操作相关
  Lived: 'lived', // 在麦嘉宾互动
}

Object.freeze(Specie)

export {Specie}
