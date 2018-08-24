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
  getCurrentUser() {
    if (!this.get('currentuserJson')) this.setCurrentUser([])
    return this.get('currentuserJson')
  }

  // REVIEW(Sunny): 引数はarrayじゃない
  setCurrentUser(obj) {
    this.set('currentuserJson', obj)
  }
  getSearchUser() {
    if (!this.get('searchJson')) this.setSearchUser([])
    return this.get('searchJson')
  }
  setSearchUser(array) {
    this.set('searchJson', array)
  }
  getFriends() {
    if (!this.get('friendsJson')) this.setFriends([])
    return this.get('friendsJson')
  }
  setFriends(array) {
    this.set('friendsJson', array)
  }
}
const UserStore = new HogeStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      UserStore.setFriends(action.json)
      UserStore.emitChange()
      break
    case ActionTypes.GET_SEARCH_USER:
      UserStore.setSearchUser(action.json)
      UserStore.emitChange()
      break
    case ActionTypes.GET_CURRENT_USER:
      UserStore.setCurrentUser(action.json)
      UserStore.emitChange()
      break
  }
  return true
})

export default UserStore
