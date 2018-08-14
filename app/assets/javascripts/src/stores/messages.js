// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

var openChatID = 1
// var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {

  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return openChatID
  }
  // あとはここ変えるやで
  getChatByUserID(id) {

  }
  getMessage() {
    if (!this.get('messageJson')) this.setMessage([])
    return this.get('messageJson')
  }
  setMessage(array) {
    // massagesJson?
    this.set('messageJson', array)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      openChatID = payload.action.userID
      MessagesStore.emitChange()
      break

  //   case ActionTypes.SEND_MESSAGE:
  //     const userID = action.userID
  //     messages[userID].messages.push({
  //       contents: action.message,
  //       timestamp: action.timestamp,
  //       from: UserStore.user.id,
  //     })
  //     MessagesStore.emitChange()
  //     break

    case ActionTypes.GET_MESSAGE: // 上のapi通信で使用したgetHogeアクションを受け取っているとします。
      MessagesStore.setMessage(action.json) // getHogeで取得したjsonをセッターを利用して保存しています。
      MessagesStore.emitChange()
      break

    // POST_MESSAGEはいるの？
    case ActionTypes.POST_MESSAGE:
      break
  }

  return true
})

window.MessagesStore = MessagesStore
export default MessagesStore
