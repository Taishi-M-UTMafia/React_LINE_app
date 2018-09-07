import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendStore extends BaseStore {
  getFriendship() {
    if (!this.get('FriendshipJson')) this.setFriendship({})
    return this.get('FriendshipJson')
  }

  setFriendship(obj) {
    this.set('FriendshipJson', obj)
  }
}

const FriendshipStore = new FriendStore()

FriendshipStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDSHIP:
      FriendshipStore.setFriendship(action.json)
      // FriendshipStore.emitChange()
      break
  }
  return true
})

export default FriendshipStore
