import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UsersStore extends BaseStore {
  getCurrentUser() {
    if (!this.get('currentUserJson')) this.setCurrentUser({})
    return this.get('currentUserJson')
  }

  setCurrentUser(obj) {
    this.set('currentUserJson', obj)
  }

  getSearchUser() {
    if (!this.get('searchJson')) this.setSearchUser({})
    return this.get('searchJson')
  }

  setSearchUser(obj) {
    this.set('searchJson', obj)
  }

  getFriends() {
    if (!this.get('friendsJson')) this.setFriends([])
    return this.get('friendsJson')
  }
  setFriends(array) {
    this.set('friendsJson', array)
  }
}

const UserStore = new UsersStore()

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
