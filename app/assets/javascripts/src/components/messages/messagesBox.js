import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages' // 追記
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
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UserStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  getCurrentUserFromStore() {
    UserAction.getCurrentUser()
    return UserStore.getUser()
  }

  render() {
    // console.log(UserStore.user.id)
    const currentUser = this.getCurrentUserFromStore()
    // const lastMessage = this.state.messages[messagesLength - 1]

    // const messagesLength = this.state.messages.length
    const currentUserID = currentUser.id

    const messages = this.state.messages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserID,
        'clear': true,
      })

      return (
            <li key={ message.from } className={ messageClasses }>
              <div className='message-box__item__contents'>
                { message.contents }
              </div>
            </li>
          )
    })

    // const test_messages = this.state.message.content
    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     // const date = Utils.getShortDate(lastMessage.timestamp)
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
              { messages }
            </ul>
            <ReplyBox />
          </div>
        )
  }
}

export default MessagesBox
