import React from 'react'
// import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
// import MessagesStore from '../../stores/messages' // 追記
// import MessageAction from '../../actions/messages' // 追記
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
// import Utils from '../../utils'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return {
      // messages: this.getMessageFromStoreByUserId(),
    }
  }

  // getSMessagesFromStoreByUser() {
  //   // MessagesStore.getOpenChatUserID()はOK
  //   MessageAction.getMessagesByUserId(MessagesStore.getOpenChatUserID())
  //   return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  // }

  getCurrentUserFromStore() {
    UserAction.getCurrentUser()
    return UserStore.getCurrentUser()
  }

  render() {
    // console.log(UserStore.user.id)
    // const currentUser = this.getCurrentUserFromStore()
//     const messages = {
//       // status,lastAccess,timestamp,read削除,profilePic⇨image_name変更
//       2: {
//         user: {
//           image_name: '/hitsujisennin.png',
//           id: 2,
//           name: 'ひつじせんにん',
//         },
//         messages: [
//           {
//             contents: 'React覚えたよ！',
//             from: 1,
//           },
//           {
//             contents: 'よくやったぞ、サニー。その調子じゃ。',
//             from: 2,
//           },
//         ],
//       },
//       3: {
//         user: {
//           image_name: '/samuraineko.jpg',
//           name: 'さむらいねこ',
//           id: 3,
//         },
//         messages: [
//           {
//             contents: 'にゃーん',
//             from: 3,
//           },
//         ],
//       },
//       4: {
//         user: {
//           name: 'にんじゃわんこ',
//           id: 4,
//           image_name: '/ninjawanko.png',
//         },
//         messages: [
//           {
//             contents: 'わん！',
//             from: 4,
//           },
//         ],
//       },
//     }
//
//     // const messagesList = this.state.messages.map((message) => {
//     const messagesList = messages.map((message) => {
//       const messageClasses = classNames({
//         'message-box__item': true,
//         'message-box__item--from-current': message.from === currentUser.id,
//         'clear': true,
//       })
//
//       return (
//             <li key={ message.from } className={ messageClasses }>
//               <div className='message-box__item__contents'>
//                 { message.contents }
//               </div>
//             </li>
//           )
//     })
//
//     // const test_messages = this.state.message.content
//     // if (lastMessage.from === currentUserID) {
//     //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
//     //     // const date = Utils.getShortDate(lastMessage.timestamp)
//     //     messages.push(
//     //           <li key='read' className='message-box__item message-box__item--read'>
//     //             <div className='message-box__item__contents'>
//     //               Read { date }
//     //             </div>
//     //           </li>
//     //         )
//     //   }
//     // }
    return (
          <div className='message-box'>
            <ul className='message-box__list'>
            </ul>
            <ReplyBox />
          </div>
        )
  }
}

export default MessagesBox
