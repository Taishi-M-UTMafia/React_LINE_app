import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendStore extends BaseStore {
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
const FriendshipStore = new FriendStore()

export default FriendshipStore
