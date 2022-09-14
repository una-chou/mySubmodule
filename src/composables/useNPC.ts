import type {DialogueConfigType} from '@/types/config'
import {find} from 'lodash'
import useConfig from '@/composables/useConfig'

// 3D端跟触发npc对话，会回传一个对话id，拿id去查对话文案
export default function useNPC() {
  const { getDialogueConfig } = useConfig()
  let chatArray: Array<DialogueConfigType> = []

  function getNPCChat(id: number | string) {
    chatArray = []
    const chatList = getDialogueConfig()
    const res = find(chatList, (item: DialogueConfigType) => { return item.id == id })
    chatArray.push(res)
    recursionChat(res, chatList)
    return chatArray
  }
  // 递归获取到连续对话的全部内容
  function recursionChat(chat: DialogueConfigType, chatList: Array<DialogueConfigType>) {
    // 规定双按钮时，右边按钮(trigger1)为确认/下一步操作，左边按钮为取消操作，所以不需要取左边按钮的行为字段
    if (chat.typeTrigger1 === 1) {
      const res = find(chatList, (item: DialogueConfigType) => { return item.id.toString() == chat.parameter1.toString() })
      chatArray.push(res)
      recursionChat(res, chatList)
    }
  }

  return {
    getNPCChat,
  }
}
