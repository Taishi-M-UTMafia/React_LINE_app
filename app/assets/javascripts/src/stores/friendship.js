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
  getFriendship() {
    if (!this.get('friendshipJson')) this.setFriendship([])
    return this.get('friendshipJson')
  }
  setFriendship(array) {
    this.set('friendshipJson', array)
  }
}
const FriendshipStore = new HogeStore()

FriendshipStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.CREATE_FRIENDSHIP:
      // FriendshipStore.setFriendship(action.json)
      // FriendshipStore.emitChange()
      break
    case ActionTypes.DESTROY_FRIENDSHIP:
      // FriendshipStore.setFriendship(action.json)
      // FriendshipStore.emitChange()
      break
  }
  return true
})

export default FriendshipStore
