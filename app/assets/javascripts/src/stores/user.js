import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
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
  getSearchUser() {
    if (!this.get('searchJson')) this.setSearchUser([])
    return this.get('searchJson')
  }
  setSearchUser(array) {
    // debugger
    this.set('searchJson', array)
  }
  getFriends() {
    if (!this.get('friendsJson')) this.setFriends([])
    return this.get('friendsJson')
  }
  setFriends(array) {
    // debugger
    this.set('friendsJson', array)
  }
}
const UserStore = new HogeStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      UserStore.setUser(action.json)
      UserStore.emitChange()
      break
    case ActionTypes.GET_SEARCH_USER:
      UserStore.setSearchUser(action.json)
      UserStore.emitChange()
      break
    case ActionTypes.GET_CURRENT_USER:
      UserStore.setUser(action.json)
      UserStore.emitChange()
      break
  }
  return true
})

export default UserStore
