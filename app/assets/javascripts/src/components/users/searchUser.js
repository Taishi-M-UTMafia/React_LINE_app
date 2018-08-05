// import React from 'react'
// // import FriendshipStore from '../../stores/friendship'
// import FriendshipAction from '../../actions/friendship'
//
// export default class SearchUser extends React.Component {
//
//   static get propTypes() {
//     return {
//       // プロパティのバリデーション。型とpresenceの設定。integerは使わない
//       key: React.PropTypes.any,
//       children: React.PropTypes.string.isRequired,
//     }
//   }
//
//   createFriend(toUserId) {
//     debugger
//     FriendshipAction.createFriend(toUserId)
//   }
//
//   render() {
//     return (
//       <div
//         className='search_user_list_result'
//         onclick= { this.createFriend.bind(this, this.props.key) }
//       >
//         {this.props.children}
//       </div>
//     )
//   }
// }
