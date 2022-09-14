export default class NimChatroom {
  constructor({onConnect, onDisconnect, onWillReconnect, onError, onMsgs}) {
    this.onConnect = onConnect
    this.onDisconnect = onDisconnect
    this.onWillReconnect = onWillReconnect
    this.onError = onError
    this.onMsgs = onMsgs
  }

  init({appKey, account, token, chatroomId, chatroomAddresses}) {
    return new Promise((resolve, reject) => {
      this.chatroom = SDK.Chatroom.getInstance({
        debug: false,
        appKey,
        account,
        token,
        chatroomId,
        chatroomAddresses,
        reconnectionAttempts: 100,
        onconnect: ({chatroom, member}) => {
          this.onConnect({chatroom, member})
          resolve({chatroom, member})
        },
        onerror: error => {
          this.onError(error)
          reject(error)
        },
        onwillreconnect: this.onWillReconnect,
        ondisconnect: this.onDisconnect,
        // 消息
        onmsgs: this.onMsgs,
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

  getMembers(accounts = []) {
    return new Promise(resolve => {
      this.chatroom.getChatroomMembersInfo({
        accounts,
        done: function (err, obj) {
          if (err) {
            console.log(err)
          }
          resolve(obj)
        },
      })
    })
  }

  async getAllMembers(isGuest = false) {
    const requestList = timetag => {
      return new Promise((resolve, reject) => {
        this.chatroom.getChatroomMembers({
          time: timetag,
          limit: 100,
          guest: isGuest,
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

    let members = []
    let timetag = 0
    let condition = true
    while (condition) {
      try {
        const ret = await requestList(timetag)
        console.log(ret)
        const lastMember = ret.members[ret.members.length - 1]
        timetag = isGuest ? lastMember.enterTime : lastMember.updateTime
        members = members.concat(ret.members)

        if (ret.members.length < 100) {
          condition = false
          break
        }
      } catch (error) {
        console.log(error)
        condition = false
        break
      }
    }

    return members
  }

  sendText(content, custom = '') {
    return new Promise((resolve, reject) => {
      this.chatroom.sendText({
        text: content,
        custom,
        done: (error, msgObj) => {
          if (error) {
            reject(error)
          }
          resolve(msgObj)
        },
      })
    })
  }

  sendFile(fileInputDom, onProgress, custom = '') {
    return new Promise((resolve, reject) => {
      this.chatroom.previewFile({
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
            this.chatroom.sendFile({
              type: 'image',
              file: file,
              custom,
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

  sendCustomMsg(obj) {
    return new Promise((resolve, reject) => {
      this.chatroom.sendCustomMsg({
        content: JSON.stringify(obj),
        done: (error, msg) => {
          if (error) {
            reject(error)
          } else {
            resolve(msg)
          }
        },
      })
    })
  }

  setAccountMute(account) {
    return new Promise((resolve, reject) => {
      this.chatroom.markChatroomGaglist({
        account,
        isAdd: true,
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

  setAccountUnMute(account) {
    return new Promise((resolve, reject) => {
      this.chatroom.markChatroomGaglist({
        account,
        isAdd: false,
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

  async getHistoryMsgs(endTime) {
    const requestList = timetag => {
      return new Promise((resolve, reject) => {
        this.chatroom.getHistoryMsgs({
          timetag,
          limit: 100,
          msgTypes: ['text', 'image', 'custom'],
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
        console.log(ret)

        timetag = ret.msgs[ret.msgs.length - 1].time
        msgs = msgs.concat(ret.msgs)

        if (ret.msgs.length < 100) {
          condition = false
          break
        }
      } catch (error) {
        console.log(error)
        condition = false
        break
      }

      condition = false
      break
    }

    return msgs
  }
}
