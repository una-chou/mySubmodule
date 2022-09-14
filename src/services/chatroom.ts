import ApiClient from '@/utils/api-client'
export default {
  auth(): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/auth`, {
      app: 'web',
      sdk: 'netease',
    })
  },
  join(type: string, hash: string): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/join`, {
      type,
      hash,
    })
  },
  getInfo(chatroomId: string): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/auth`, {chatroom_id: chatroomId})
  },
  setReview(roomId: number, isOpen: number): any {
    return ApiClient.put(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/review`, {
      room_id: roomId,
      review: isOpen,
    })
  },
  setMute(roomId: number, isOpen: boolean): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/mute_room`, {
      room_id: roomId,
      banned: isOpen,
    })
  },
  setAccountMute(roomId: number, account: string, isOpen: boolean): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/temporary_mute`, {
      room_id: roomId,
      banned: isOpen,
      target: account,
    })
  },
  delMsg(params: any): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/recall`, params)
  },
  review(params: any): any {
    return ApiClient.put(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/review-allowed`, params)
  },
  role(type: string, hash: string, roomId: number): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/chatroom/role`, {
      hash,
      type,
      room_id: roomId,
    })
  },
}
