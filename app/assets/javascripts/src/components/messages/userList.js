import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
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
    return {
      openChatID : null,
      messageList: [],
    }
  }

  componentWillMount() {
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
    const friends = UserStore.getFriends()
    const messageList = []
    _.each(friends, (friend) => {
      const messages = MessagesStore.getMessagesByUserId(friend.id)
      const messageLength = messages.length
      var lastMessage = messages[messageLength - 1]
      if (lastMessage === void 0) lastMessage = {}
      messageList.push({
        friend     : friend,
        // lastAccess : ,
        lastMessage: lastMessage,
      })
    })
    return {
      openChatID : MessagesStore.getOpenChatUserID(),
      messageList: messageList,
    }
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  destroyFriendship(toUserId) {
    if (window.confirm('本当に友達解除しますか？')) {
      FriendshipAction.destroyFriendship(toUserId)
      UserAction.getFriends()
      .then(() => MessagesAction.getMessagesByUserId(this.state.openChatID))
    }
  }

  render() {
    console.log(this.state.messageList)
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
        return -1
      }
      if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
        return 1
      }
      return 0
    })

    const userList = this.state.messageList.map((message, index) => {
      var statusIcon
    //   if (message.lastMessage.from !== message.user.id) {
    //     statusIcon = (
    //       <i className='fa fa-reply user-list__item__icon' />
    //     )
    //   }
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      statusIcon = (
          <i className='fa fa-circle user-list__item__icon' />
        )
    //   }

      const itemClasses = classNames({
        'user-list__item'        : true,
        'clear'                  : true,
        'user-list__item--active': this.state.openChatID === message.friend.id,
      })

      return (
        <li
          key = { message.friend.id }
          onClick = { this.changeOpenChat.bind(this, message.friend.id) }
          className = { itemClasses }
        >
          <div className = 'user-list__item__picture'><img src = { message.friend.image_name }/></div>
          <div className = 'user-list__item__details'>
            <h4 className = 'user-list__item__name'>{ message.friend.name }</h4>
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
