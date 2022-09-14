import TaskService from '@/services/task'
import {setStoreState} from '../../utils'
const taskActions = {
  async getTaskList(): Promise<any> {
    try {
      let taskList = await TaskService.getTaskList()
      setStoreState('task', 'taskList', taskList.tasks)
      return taskList.tasks
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async getTaskReward(context: any, params: object): Promise<any> {
    try {
      return await TaskService.getTaskReward(params)
    } catch(error) {
      throw error
    }
  }
}

type TaskActionsType = typeof taskActions

export {TaskActionsType}
export default taskActions
