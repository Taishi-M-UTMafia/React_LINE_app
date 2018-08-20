// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

var openChatID = 0
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

window.MessagesStore = MessagesStore
export default MessagesStore
