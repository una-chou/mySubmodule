export type ChatroomType = {
  room_id: number
  third_part_id: string
  review: boolean
  banned: boolean
  addr: Array<string>
  appkey: string
}
export type ImOneOneType = {
  accid: string
  greetingRelation: number
}

export type MineInfoType = {
  is_admin: boolean
  accid: string
  token: string
  banned: number
}

export type FileType = {
  name: string
  size: string
  md5: string
  url: string
  ext: string
  w: string
  h: string
}

export type MsgType = {
  chatroomId: number
  idClient: string
  from: string
  fromNick: string
  fromAvatar: string
  fromCustom: {
    identify: string
    user_hash: string
  }
  banned: number
  fromClientType: string
  type: string
  flow: string
  text?: string
  file?: FileType
  attach: any
  content: {
    sub_type: string
  }
  custom: {
    allowed: boolean
    highlight: boolean
  }
  time: string
  to: string
  display_text?: string
  t: string
  status: string
}

export type MsgsType = {
  time: string
  msgs: Array<MsgType>
}

export type StatusType = 'init' | 'connected' | 'break'
