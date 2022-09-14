/* eslint-disable*/
/**
 * @Author: hanyang (yang_han@gotin.online)
 * @Date:   2020-06-09 15:32:11
 * 页面的脚手架, 方便创建空白的组件目录及文件
 * 输入类型和路径, 然后在该路径上创建文件夹及核心文件
 * 示例
 *   npm run skel module auth
 *   src/stores/modules/auth
 *     actions.ts
 *     getters.ts
 *     mutations.ts
 *     state.ts
 */
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const os = require('os')

const fileType = process.argv[2]
const fileName = process.argv[3]

let username = os.userInfo().username
// todo 这里可以个人做硬转换
if (username === 'hanyang') {
  username = 'yang_han'
}

function run() {
  if (!fileType || !fileName) {
    console.log('\x1B[31m%s\x1B[0m', '请按照格式输入, 如 npm run skel module auth')
    process.exit()
  }

  const cwd = process.cwd()

  switch (fileType) {
    case 'module':
      const folder = path.resolve(cwd, `src/store/modules/${fileName}`)
      if (!fs.existsSync(folder)) {
        console.log('\x1B[32m%s\x1B[0m', `创建目录: ${folder}`)
        fs.mkdirSync(folder)
      }

      const now = new Date().toISOString().replace('T', ' ').slice(0, -5)
      const actionFile = `${folder}/actions.ts`
      if (fs.existsSync(actionFile)) {
        console.log('\x1B[31m%s\x1B[0m', `${fileName}/actions.ts文件已存在`)
      } else {
        console.log('\x1B[32m%s\x1B[0m', `创建${fileName}/actions.ts文件成功`)
        fs.writeFileSync(actionFile, getActionFileContent(fileName, now))
      }

      const getterFile = `${folder}/getters.ts`
      if (fs.existsSync(getterFile)) {
        console.log('\x1B[31m%s\x1B[0m', `${fileName}/getters.ts文件已存在`)
      } else {
        console.log('\x1B[32m%s\x1B[0m', `创建${fileName}/getters.ts文件成功`)
        fs.writeFileSync(getterFile, getGetterFileContent(fileName, now))
      }

      const mutationFile = `${folder}/mutations.ts`
      if (fs.existsSync(mutationFile)) {
        console.log('\x1B[31m%s\x1B[0m', `${fileName}/mutations.ts文件已存在`)
      } else {
        console.log('\x1B[32m%s\x1B[0m', `创建${fileName}/mutations.ts文件成功`)
        fs.writeFileSync(mutationFile, getMutationFileContent(fileName, now))
      }

      const stateFile = `${folder}/state.ts`
      if (fs.existsSync(stateFile)) {
        console.log('\x1B[31m%s\x1B[0m', `${fileName}/state.ts文件已存在`)
      } else {
        console.log('\x1B[32m%s\x1B[0m', `创建${fileName}/state.ts文件成功`)
        fs.writeFileSync(stateFile, getStateFileContent(fileName, now))
      }

      const utilContent = fs.readFileSync(path.resolve(cwd, `src/store/utils.ts`), 'utf8')
      if (utilContent.indexOf(`type ModuleNameType = 'user' | '${fileName}'`) > -1) {
        console.log('\x1B[31m%s\x1B[0m', `store/utils.ts已修改`)
      } else {
        const newUtilContent = utilContent.replace(
          `type ModuleNameType = 'user'`,
          `type ModuleNameType = 'user' | '${fileName}'`,
        )
        fs.writeFileSync(path.resolve(cwd, `src/store/utils.ts`), newUtilContent)
        console.log('\x1B[32m%s\x1B[0m', `修改store/utils.ts文件成功`)
      }

      const typeContent = fs.readFileSync(path.resolve(cwd, `src/types/index.ts`), 'utf8')
      if (
        typeContent.indexOf(`import {${_.upperFirst(fileName)}StateType} from '@/store/modules/${fileName}/state`) > -1
      ) {
        console.log('\x1B[31m%s\x1B[0m', `types/index.ts已修改`)
      } else {
        let newTypeContent = typeContent.replace(
          `import {UserStateType} from '@/store/modules/user/state'`,
          `import {UserStateType} from '@/store/modules/user/state'
import {${_.upperFirst(fileName)}StateType} from '@/store/modules/${fileName}/state'`,
        )

        newTypeContent = newTypeContent.replace(
          `  user: UserStateType`,
          `  user: UserStateType
  ${fileName}: ${_.upperFirst(fileName)}StateType`,
        )
        fs.writeFileSync(path.resolve(cwd, `src/types/index.ts`), newTypeContent)
        console.log('\x1B[32m%s\x1B[0m', `types/index.ts修改成功`)
      }
      break

    default:
      break
  }
}

function getActionFileContent(name, now) {
  return `/**
 * @Author: ${username} (${username}@gotin.online)
 * @Date:   ${now}
 */
import ${_.upperFirst(name)}Service from '@/services/${name}'
import {setStoreState} from '../../utils'
import {StateType} from '@/types/index'
// import Store from '@/store'

const ${name}Actions = {
  async todo(context: StateType): Promise<any> {
    try {
      const todo = await ${_.upperFirst(name)}Service.get()
      // Store.state.user.user
      setStoreState('${name}', 'todo', todo)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

type ${_.upperFirst(name)}ActionsType = typeof ${name}Actions

export {${_.upperFirst(name)}ActionsType}
export default ${name}Actions
`
}

function getGetterFileContent(name, now) {
  return `/**
 * @Author: ${username} (${username}@gotin.online)
 * @Date:   ${now}
 */
export default {
  //
}
`
}

function getMutationFileContent(name, now) {
  return `/**
 * @Author: ${username} (${username}@gotin.online)
 * @Date:   ${now}
 */
export default {
  __set(state: any, msg: {key: string; val: any}): void {
    state[msg.key] = msg.val
  },
}
`
}

function getStateFileContent(name, now) {
  return `/**
 * @Author: ${username} (${username}@gotin.online)
 * @Date:   ${now}
 */
import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  todo: '',
}
type ${_.upperFirst(name)}StateType = typeof state

const ${name}: Module<${_.upperFirst(name)}StateType, StateType> = {
  namespaced: true,
  ...state,
}

export {${_.upperFirst(name)}StateType, state}
export default ${name}

`
}

run()
