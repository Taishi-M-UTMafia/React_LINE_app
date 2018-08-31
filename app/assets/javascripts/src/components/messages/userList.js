import React from 'react'
import classNames from 'classnames'
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
      openChatID: null,
      friends   : [],
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
    return {
      friends   : UserStore.getFriends(),
      openChatID: MessagesStore.getOpenChatUserID(),
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
    const userList = this.state.friends.map((friend) => {
      const itemClasses = classNames({
        'user-list__item'        : true,
        'clear'                  : true,
        'user-list__item--active': this.state.openChatID === friend.id,
      })

      return (
        <li
          key = { friend.id }
          onClick = { this.changeOpenChat.bind(this, friend.id) }
          className = { itemClasses }
        >
          <div className = 'user-list__item__picture'><img src = { friend.image_name }/></div>
          <div className = 'user-list__item__details'>
            <h4 className = 'user-list__item__name'>{ friend.name }</h4>
            <span className = 'user-list__item__deletefriend'>
              <div
                key = { friend.id }
                onClick = { this.destroyFriendship.bind(this, friend.id) }
              >削除</div>
            </span>
          </div>
        </li>
      )
    })

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
