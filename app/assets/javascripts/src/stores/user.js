import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import MessagesStore from '../stores/messages' // 追記
import {ActionTypes} from '../constants/app'

class HogeStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  // getOpenChatUserID() {
  //   return openChatID
  // }
  // getChatByUserID(id) {
  //   return messages[id]
  // }
  // getAllChats() {
  //   return messages
  // }
  getUser() {
    if (!this.get('userJson')) this.setUser([])
    return this.get('userJson')
  }
  setUser(array) {
    // massagesJson?
    this.set('userJson', array)
  }
}
const UserStore = new HogeStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
  //   case ActionTypes.UPDATE_OPEN_CHAT_ID:
  //     openChatID = payload.action.userID
  //     MessagesStore.emitChange()
  //     break
  //
  //   case ActionTypes.SEND_MESSAGE:
  //     const userID = action.userID
  //     messages[userID].messages.push({
  //       contents: action.message,
  //       timestamp: action.timestamp,
  //       from: UserStore.user.id,
  //     })
  //     MessagesStore.emitChange()
  //     break

    case ActionTypes.GET_USER: // 上のapi通信で使用したgetHogeアクションを受け取っているとします。
      UserStore.setUser(action.json) // getHogeで取得したjsonをセッターを利用して保存しています。
      UserStore.emitChange()
      break

    // POST_MESSAGEはいるの？
    // case ActionTypes.POST_MESSAGE:
    //   break
  }

  return true
})

export default UserStore
