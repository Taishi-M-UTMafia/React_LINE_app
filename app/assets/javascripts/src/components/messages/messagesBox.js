import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages' // 追記
import MessageAction from '../../actions/messages' // 追記
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      messages: [],
      // TODO: currentUserは配列じゃない
      currentUser: [],
    }
  }

  componentWillMount() {
    UserAction.getCurrentUser()
    UserStore.onChange(this.onStoreChange.bind(this))
    // OpenChatIDに初期値を入れるためのgetFriends()
    UserAction.getFriends()
    .then(() => MessageAction.getMessagesByUserId(MessagesStore.getOpenChatUserID()))
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    // TODO: 動いていない
    // TODO: MessagesStoreもoffChange
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return {
      currentUser: UserStore.getCurrentUser(),
      messages: MessagesStore.getMessagesByUserId(MessagesStore.getOpenChatUserID()),
    }
  }

  render() {
    const messagesList = this.state.messages.map((message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id === this.state.currentUser.id,
        'clear': true,
      })
      if(message.message_type === "text"){
        return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.content }
            </div>
          </li>
        )
      } else if(message.message_type === "image"){
        return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              <img className="image_message" src={ 'message_images/'+message.content } />
            </div>
          </li>
        )
      }
    })

    return (
      <div className='message-box'>
        <ul className='message-box__list'>
         { messagesList }
        </ul>
        <ReplyBox />
      </div>
    )
  }
}

export default MessagesBox
