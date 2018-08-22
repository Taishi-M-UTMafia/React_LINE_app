import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記
import UserAction from '../actions/user'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {

  getOpenChatUserID() {
    if (!this.get('openChatID')) this.setOpenChatUserID()
    return this.get('openChatID')
  }
  setOpenChatUserID(id) {
    this.set('openChatID', id)
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

// dispatcherがActionを受け取ったらTypeをキーに関数を呼び出す。Storeはここでイベントが発行されるのを監視。
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    
    case ActionTypes.FIRST_OPENCHATID:
      MessagesStore.setOpenChatUserID(action.firstID)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      // openChatID = action.userID
      MessagesStore.setOpenChatUserID(action.userID)
      // Store変更イベントの実装
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGE:
      MessagesStore.setMessage(action.json)
      MessagesStore.emitChange()
      break

  }
  return true
})

export default MessagesStore
