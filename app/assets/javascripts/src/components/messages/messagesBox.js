import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages'
import MessageAction from '../../actions/messages'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this._onStoreChange.bind(this)
  }

  get initialState() {
    return {
      openChatID : null,
      currentUser: {},
      messages   : [],
      toUser     : {},
    }
  }

  componentWillMount() {
    UserAction.getCurrentUser()
    UserAction.getFriends() // OpenChatIDに初期値を入れるためのgetFriends()
    .then(() => {
      MessageAction.getMessagesByUserId(this.state.openChatID)
      UserAction.getToUser(this.state.openChatID)
    })
    UserStore.onChange(this.onStoreChange)
    MessagesStore.onChange(this.onStoreChange)
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange)
    MessagesStore.offChange(this.onStoreChange)
  }

  _onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return {
      openChatID : MessagesStore.getOpenChatUserID(),
      currentUser: UserStore.getCurrentUser(),
      messages   : MessagesStore.getMessagesByUserId(this.state.openChatID),
      toUser     : UserStore.getToUser(this.state.openChatID),
    }
  }

  destroyMessage(messageID) {
    if (window.confirm('この投稿を削除しますか？(相手からも見えなくなります)')) {
      MessageAction.destroyMessage(this.state.openChatID, messageID)
    }
  }

  render() {
    const messagesList = this.state.messages.map((message) => {
      const messageClasses = classNames({
        'clear'                          : true,
        'message-box__item'              : true,
        'message-box__item--from-current': message.from_user_id === this.state.currentUser.id,
      })

      let isText = (message.message_type === 'text')
      return (
        <li key = { message.id } className = { messageClasses }>
          <div className = 'user-list__item__picture'>
            <img className = 'icon_by_message' src = { this.state.toUser.image_name }/>
          </div>
          <p>{ this.state.toUser.name }</p>
          <div className = 'message-box__item__contents'>
            { isText ? <span>{ message.content }</span> : <img className = 'image_message' src = { 'message_images/' + message.content } /> }
            <div
              key = { message.id }
              onClick = { this.destroyMessage.bind(this, message.id) }
            ><i className = 'fas fa-times-circle'></i></div>
          </div>
        </li>
      )
    })

    return (
      <div className = 'message-box'>
        <ul className = 'message-box__list'>{ messagesList }</ul>
        <ReplyBox />
      </div>
    )
  }
}

export default MessagesBox
