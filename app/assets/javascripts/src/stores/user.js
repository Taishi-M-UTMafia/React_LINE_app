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
  getUser() {
    if (!this.get('userJson')) this.setUser([])
    return this.get('userJson')
  }
  setUser(array) {
    this.set('userJson', array)
  }
}
const UserStore = new HogeStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_USER:
      UserStore.setUser(action.json)
      UserStore.emitChange()
      break
    case ActionTypes.GET_SEARCH_USER:
      UserStore.setUser(action.json)
      UserStore.emitChange()
      break
  }
  return true
})

export default UserStore
