import Dispatcher    from '../dispatcher'
import BaseStore     from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  getOpenChatUserID() {
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

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.FIRST_OPENCHATID:
      MessagesStore.setOpenChatUserID(action.firstID)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatUserID(action.userID)
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
