const GameResponse: any = {
  Enter: '3dEnter', // 初始化loading的enter事件
  Newcomer: 'startGuide', // 新手引导摄像头拉近完成
  NpcStart: 'npcStart', // NPC对话
  OpenAccount: 'openAccount', // 卡点开户提示
  WrongAccount: 'wrongAccount', // 钻石超出上限
  ShowDuckDialog: 'showDuckDialog', // 彩蛋鸭刷新出来时的默认对话
  ShowDuckPopup: 'showDuckPopup', // 彩蛋鸭刷新出来时的默认对话2
  GetDuck: 'getDuck', // 获得彩蛋鸭
  WrongNetwork: 'wrongNetwork', // 断网弱网
  UpdateHome: 'updateHome', // 主界面红点更新
  CameraStart: 'cameraStart', // 相机开始
  CameraEnd: 'cameraEnd', // 相机结束
}

Object.freeze(GameResponse)

export {GameResponse}