import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return { friendWithMessages: [] }
  }

  getOpenChatUserID() {
    if (!this.get('openChatID')) this.setOpenChatUserID(null)
    return this.get('openChatID')
  }

  setOpenChatUserID(id) {
    this.set('openChatID', id)
  }

  getOpenChatMessages() {
    if (!this.get('openchatmessageJson')) this.setOpenChatMessages([])
    return this.get('openchatmessageJson')
  }

  setOpenChatMessages(array) {
    this.set('openchatmessageJson', array)
  }

  getFriendWithMessages() {
    return this.state.friendWithMessages
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatUserID(action.userID)
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_OPEN_CHAT_MESSAGE:
      MessagesStore.setOpenChatMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGE_BY_ID:
      MessagesStore.state.friendWithMessages.push({
        friend  : action.friend,
        messages: action.json,
      })
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
