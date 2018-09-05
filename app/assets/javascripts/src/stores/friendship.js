// import Dispatcher    from '../dispatcher'
// import BaseStore     from '../base/store'
// import {ActionTypes} from '../constants/app'
//
// class FriendStore extends BaseStore {
//   constructor(props) {
//     super(props)
//     this.state = this.initialState
//   }
//
//   get initialState() {
//     return { friendship: [] }
//   }
// }
//
// const FriendshipStore = new FriendStore()
//
// FriendshipStore.dispatchToken = Dispatcher.register(payload => {
//   const action = payload.action
//
//   switch (action.type) {
//     case ActionTypes.FRIENDSHIP_SAVE:
//       FriendshipStore.state.friendship.push({})
//       debugger
//       console.log(FriendshipStore.state.friendship)
//       FriendshipStore.emitChange()
//       break
//   }
//   return true
// })
//
// export default FriendshipStore
