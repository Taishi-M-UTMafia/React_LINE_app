import React from 'react'
// import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages' // 追記
import MessageAction from '../../actions/messages' // 追記
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'

// import Utils from '../../utils'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    // initialStateはgetStateFromStore参照（この真下）
    return this.getStateFromStore()
  }
  getStateFromStore() {
    //
    return {
      message: MessagesStore.getMessage(),
      user: UserStore.getUser(),
    }
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    MessageAction.getMessage()
    UserStore.onChange(this.onStoreChange.bind(this))
    UserAction.getUser()
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    console.log(this.state.user)
    // const currentUserID = UserStore.user.id

    // const messages = this.state.messages.map((message, index) => {
    //   const messageClasses = classNames({
    //     'message-box__item': true,
    //     'message-box__item--from-current': message.from === currentUserID,
    //     'clear': true,
    //   })
    //
    //   return (
    //         <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
    //           <div className='message-box__item__contents'>
    //             { message.contents }
    //           </div>
    //         </li>
    //       )
    // })

    const test_messages = this.state.message.content

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //           <li key='read' className='message-box__item message-box__item--read'>
    //             <div className='message-box__item__contents'>
    //               Read { date }
    //             </div>
    //           </li>
    //         )
    //   }
    // }
    return (
          <div className='message-box'>
            <ul className='message-box__list'>
              { test_messages }
            </ul>
            <ReplyBox />
          </div>
        )
  }
}

export default MessagesBox
