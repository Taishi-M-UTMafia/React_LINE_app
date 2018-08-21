import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

// parseIntは文字列を整数に変換。第二引数の10は十進法であることを示す。Objet.keysは引数オブジェクトのプロパティ(キー)を取得。
var openChatID= parseInt(Object.keys(UserStore.getFriends())[0], 10)
// var openChatID= Object.keys(UserStore.getFriends())[0]

class ChatStore extends BaseStore {

  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    // console.log(Object.keys(UserStore.getFriends())[0])
    // console.log(UserStore.getFriends())
    console.log(openChatID)
    return openChatID
  }
  getMessagesByUserId(id) {
    if (!this.get('messageJson')) this.setMessage([])
    return this.get('messageJson')
  }
  setMessage(array) {
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

    case ActionTypes.GET_MESSAGE:
      MessagesStore.setMessage(action.json)
      MessagesStore.emitChange()
      break

  }

  return true
})
// window.MessagesStore = MessagesStore
export default MessagesStore
