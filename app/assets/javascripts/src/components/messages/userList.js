import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
import FriendshipAction from '../../actions/friendship'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this._onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange)
    MessagesStore.onChange(this.onStoreChange)
    // FriendshipStore.onChange(this.onStoreChange)
    UserAction.getFriends()
    .then(() => {
      _.each(this.state.friends, (friend) => MessagesAction.getMessagesByFriendID(friend))
    })
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange)
    MessagesStore.offChange(this.onStoreChange)
  }

  _onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    const messages = MessagesStore.getFriendWithMessages()
    const messageList = []
    _.each(messages, (message) => {
      var lastMessage = message.messages[message.messages.length - 1]
      if (lastMessage === void 0) lastMessage = {}
      messageList.push({
        lastMessage: lastMessage,
        lastAccess : message.lastAccess,
        friend     : message.friend,
      })
    })
    return {
      friends    : UserStore.getFriends(),
      currentUser: UserStore.getCurrentUser(),
      openChatID : MessagesStore.getOpenChatUserID(),
      messageList: messageList,
    }
  }

  changeOpenChat(id) {
    FriendshipAction.updateLastAccess(id)
    .then(() => MessagesAction.changeOpenChat(id))
    .then(() => {
      MessagesStore.state.friendWithMessages = []
      _.each(this.state.friends, (friend) => MessagesAction.getMessagesByFriendID(friend))
    })
  }

  destroyFriendship(toUserId) {
    if (window.confirm('本当に友達解除しますか？')) {
      FriendshipAction.destroyFriendship(toUserId)
      UserAction.getFriends()
      MessagesStore.state.friendWithMessages = []
      _.each(this.state.friends, (friend) => MessagesAction.getMessagesByFriendID(friend))
    }
  }

  render() {
    // HACK(Sunny): lastMessageが空の場合は？
    this.state.messageList.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)

    const userList = this.state.messageList.map((message, index) => {
      var statusIcon
      if (message.lastMessage.user_id === this.state.currentUser.id) {
        statusIcon = <i className='fa fa-reply user-list__item__icon' />
      }
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        statusIcon = <i className='fa fa-circle user-list__item__icon' />
      }

      var isNewMessage = false
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        isNewMessage = message.lastMessage.from !== message.friend.id
      }

      const itemClasses = classNames({
        'user-list__item'        : true,
        'clear'                  : true,
        'user-list__item--new'   : isNewMessage,
        'user-list__item--active': this.state.openChatID === message.friend.id,
      })

      const date = Utils.getNiceDate(message.lastMessage.timestamp)

      return (
        <li
          key = { message.friend.id }
          onClick = { this.changeOpenChat.bind(this, message.friend.id) }
          className = { itemClasses }
        >
          <div className = 'user-list__item__picture'><img src = { message.friend.image_name.url }/></div>
          <div className = 'user-list__item__details'>
            <h4 className = 'user-list__item__name'>
              { message.friend.name }
            </h4>
            <p className='user-list__item__timestamp'>{ date }</p>
            <span className = 'user-list__item__deletefriend'>
              <div
                key = { message.friend.id }
                onClick = { this.destroyFriendship.bind(this, message.friend.id) }
              ><i className = 'fas fa-times-circle'></i></div>
            </span>
            <span className='user-list__item__message'>
              { statusIcon } { message.lastMessage.content }
            </span>
          </div>
        </li>
      )
    }, this)

    return (
      <div className = 'user-list'>
        <ul className = 'user-list__list'>
          { userList }
        </ul>
      </div>
    )
  }
}

export default UserList
