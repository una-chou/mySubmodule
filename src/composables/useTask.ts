import {useStore} from 'vuex'
import type {StateType} from '@/types'
import useConfig from '@/composables/useConfig'
import type {TaskConfig} from '@/types/config'
import _ from 'lodash'

export default function useTask() {
  const store = useStore<StateType>()

  const {getTaskConfig} = useConfig()

  async function getCurrentTaskList() {
    let result = []

    const config = getTaskConfig()
    const list = await store.dispatch('task/getTaskList')
    
    const taskKey = [
      'id',
      'desTask',
      'parameter1',
      'triggerType', // 任务的触发类型
      'typeTask', // 任务类型 1每日任务，2活动任务
      'awardNum', // 奖品数量
      'awardId', // 奖品id
      'typeTaskText',
      'state', // 任务状态
      'process', // 任务需要完成的数量总合
      'finishNum', // 当前完成的任务条数
    ]

    result = config.map((item: TaskConfig) => {
      const filter = list.find((v: any) => v.id.toString() === item.id.toString())
      let val: any = {...item, ...filter}
      val['awardNum'] = item.award.split(',')[1]
      val['awardId'] = item.award.split(',')[0]
      val['typeTaskText'] = item.typeTask===1?'每日任务':item.typeTask===2?'活动任务':''
      val['finishNum'] = filter?.finishNum > filter?.process ? filter?.process : filter?.finishNum
      return  _.pick(val, taskKey)
    })
    console.log('result', result);
    
    return result
  }
  async function getTaskReward(params: any) {
    try {
      return await store.dispatch('task/getTaskReward', params)
    } catch(error) {
      console.log(error);
      throw error
    }
  }

  return {getCurrentTaskList, getTaskReward}
}
