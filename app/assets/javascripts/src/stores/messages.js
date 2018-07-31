// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

const messages = {
  2: {
    user: {
      profilePicture: '/hitsujisennin.png',
      id: 2,
      name: 'ひつじせんにん',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'React覚えたよ！',
        from: 1,
        timestamp: 1424469793023,
      },
      {
        contents: 'よくやったぞ、サニー。その調子じゃ。',
        from: 2,
        timestamp: 1424469794000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: '/samuraineko.jpg',
      name: 'さむらいねこ',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'にゃーん',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'にんじゃわんこ',
      id: 4,
      profilePicture: '/ninjawanko.png',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },
    messages: [
      {
        contents: 'わん！',
        timestamp: 1424423579000,
        from: 4,
      },
    ],
  },
}

var openChatID = parseInt(Object.keys(messages)[0], 10)

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
  getChatByUserID(id) {
    return messages[id]
  }
  getAllChats() {
    return messages
  }
  getMessage(){
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

    case ActionTypes.SEND_MESSAGE:
      const userID = action.userID
      messages[userID].messages.push({
        contents: action.message,
        timestamp: action.timestamp,
        from: UserStore.user.id,
      })
      MessagesStore.emitChange()
      break

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
