// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記

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
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case 'updateOpenChatID':
      openChatID = action.userID
      messages[openChatID].lastAccess.currentUser = +new Date() // 追記
      MessagesStore.emitChange()
      break
      // 追記
    case 'sendMessage':
      const userID = action.userID
      messages[userID].messages.push({
        contents: action.message,
        timestamp: action.timestamp,
        from: UserStore.user.id,
      })
      messages[userID].lastAccess.currentUser = +new Date() // 追記
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
