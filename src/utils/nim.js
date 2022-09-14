import dayjs from 'dayjs'
import _ from 'lodash'
export default class Nim {
  constructor({
    onConnect,
    onDisconnect,
    onWillReconnect,
    onError,
    onSyncDone,
    onMsg,
    onSessions,
    onUpdateSession,
    onRoamingMsgs,
    onOfflineMsgs,
    onUsers,
    onUpdateUser,
  }) {
    this.onConnect = onConnect
    this.onDisconnect = onDisconnect
    this.onWillReconnect = onWillReconnect
    this.onError = onError
    this.onMsg = onMsg
    this.onSyncDone = onSyncDone

    this.onSessions = onSessions
    this.onUpdateSession = onUpdateSession
    this.onRoamingMsgs = onRoamingMsgs
    this.onOfflineMsgs = onOfflineMsgs

    this.onUsers = onUsers
    this.onUpdateUser = onUpdateUser
  }

  init({appKey, account, token}) {
    return new Promise((resolve, reject) => {
      this.nim = SDK.NIM.getInstance({
        debug: false, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
        needReconnect: true,
        quickReconnect: true,
        reconnectionAttempts: 100,
        appKey,
        account,
        token,
        db: true, //若不要开启数据库请设置false。SDK默认为true。
        autoMarkRead: true,
        syncSessionUnread: true,
        onconnect: () => {
          this.onConnect()
          resolve()
        },
        onerror: error => {
          this.onError(error)
          reject(error)
        },
        onwillreconnect: this.onWillReconnect,
        ondisconnect: this.onDisconnect,
        onsyncdone: this.onSyncDone,
        // 消息
        onmsg: this.onMsg,
        onsessions: this.onSessions,
        onupdatesession: this.onUpdateSession,
        onroamingmsgs: this.onRoamingMsgs,
        onofflinemsgs: this.onOfflineMsgs,

        // onusers: this.onUsers,
        onupdateuser: this.onUpdateUser,
      })
    })
  }

  destory() {
    return new Promise(resolve => {
      this.chatroom.destroy({
        done: function (err) {
          console.log('实例已被完全清除')
          if (err) {
            console.log(err)
          }
          resolve()
        },
      })
    })
  }

  getUsers(accounts) {
    return new Promise(resolve => {
      this.nim.getUsers({
        accounts,
        // sync: true,
        done: function (err, users) {
          console.log('获取用户成功')
          if (err) {
            console.log(err)
          }
          resolve(users)
        },
      })
    })
  }

  updateMyInfo(avatar = '') {
    return new Promise((resolve, reject) => {
      this.nim.updateMyInfo({
        avatar,
        done: (error, obj) => {
          if (error) {
            reject(error)
          }
          resolve(obj)
        },
      })
    })
  }

  getLocalSessions(lastSessionId = '') {
    return new Promise((resolve, reject) => {
      this.nim.getLocalSessions({
        lastSessionId: lastSessionId,
        limit: 100,
        done: (error, obj) => {
          if (error) {
            reject(error)
          }
          resolve(obj)
        },
      })
    })
  }

  getServerSessions(minTimestamp = 0, maxTimestamp = dayjs().valueOf()) {
    return new Promise((resolve, reject) => {
      this.nim.getServerSessions({
        minTimestamp,
        maxTimestamp,
        needLastMsg: true,
        limit: 100,
        done: (error, obj) => {
          if (error) {
            reject(error)
          }
          resolve(obj)
        },
      })
    })
  }

  sendCustom(to, content, scene = 'p2p') {
    return new Promise((resolve, reject) => {
      this.nim.sendCustomMsg({
        scene,
        to,
        content: JSON.stringify(content),
        done: (error, msgObj) => {
          if (error) {
            reject(error)
          }
          resolve(msgObj)
        },
      })
    })
  }

  getServerTime() {
    return new Promise((resolve, reject) => {
      this.nim.getServerTime({
        done: (error, time) => {
          if (error) {
            reject(error)
          }
          resolve(time)
        },
      })
    })
  }

  sendText(to, content, scene = 'p2p') {
    return new Promise((resolve, reject) => {
      this.nim.sendText({
        scene,
        to,
        text: content,
        done: (error, msgObj) => {
          if (error) {
            reject(error)
          }
          resolve(msgObj)
        },
      })
    })
  }

  sendFile(to, fileInputDom, onProgress, custom = '') {
    return new Promise((resolve, reject) => {
      this.nim.previewFile({
        type: 'image',
        fileInput: fileInputDom,
        uploadprogress: function (obj) {
          console.log('文件总大小: ' + obj.total + 'bytes')
          console.log('已经上传的大小: ' + obj.loaded + 'bytes')
          console.log('上传进度: ' + obj.percentage)
          console.log('上传进度文本: ' + obj.percentageText)
          onProgress(obj)
        },
        done: (error, file) => {
          console.log('上传image' + (!error ? '成功' : '失败'))
          // show file to the user
          if (!error) {
            this.nim.sendFile({
              scene: 'p2p',
              type: 'image',
              to,
              file,
              done: (error, msg) => {
                if (error) {
                  reject(error)
                } else {
                  resolve(msg)
                }
              },
            })
          } else {
            reject(error)
          }
        },
      })
    })
  }

  async getHistoryMsgs(to, endTime) {
    const requestList = timetag => {
      return new Promise((resolve, reject) => {
        this.nim.getHistoryMsgs({
          scene: 'p2p',
          to,
          timetag,
          limit: 100,
          // msgTypes: ['text', 'image'],
          done: (error, obj) => {
            if (error) {
              reject(error)
            } else {
              resolve(obj)
            }
          },
        })
      })
    }

    let msgs = []
    let timetag = endTime
    let condition = true
    while (condition) {
      try {
        const ret = await requestList(timetag)

        msgs = _.concat(ret.msgs, msgs)
        if (ret.msgs.length < 100) {
          condition = false
          break
        }
        timetag = ret.msgs[ret.msgs.length - 1].time
      } catch (error) {
        console.log(error)
        condition = false
        break
      }
    }

    return msgs
  }

  setCurrSession(sessionId) {
    return this.nim.setCurrSession(sessionId)
  }

  resetSessionUnread(sessionId) {
    return this.nim.resetSessionUnread(sessionId)
  }

  markMsgRead(msgs) {
    return this.nim.markMsgRead(msgs)
  }

  mergeMsgs(msgs1, msgs2) {
    return this.nim.mergeMsgs(msgs1, msgs2)
  }

  mergeUsers(users1, users2) {
    return this.nim.mergeUsers(users1, users2)
  }

  mergeSessions(sessions1, sessions2) {
    return this.nim.mergeSessions(sessions1, sessions2)
  }
}
