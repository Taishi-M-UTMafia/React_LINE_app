import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import UserAction from '../../actions/user'
import FriendshipAction from '../../actions/friendship'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return {
      openChatID: '',
      friends: [],
    }
  }
  componentWillMount() {
    // ActionをCallする
    UserAction.getFriends()
    // Storeの変更を監視
    UserStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    // 監視をやめる
    UserStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    // Storeが変更されたら呼び出され、Storeから取ってきたデータをStateにセット
    this.setState(this.getStateFromStore())
  }
  getStateFromStore() {
    return {
      friends: UserStore.getFriends(),
      openChatID: MessagesStore.getOpenChatUserID(UserStore.getFriends()),
    }
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
    MessagesAction.getMessagesByUserId(MessagesStore.getOpenChatUserID())
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  destroyFriend(toUserId) {
    if (window.confirm('本当に友達解除しますか？') === true) {
      FriendshipAction.destroyFriend(toUserId)
      UserAction.getFriends()
      .then(() => MessagesAction.getMessagesByUserId(MessagesStore.getOpenChatUserID()))
    }
  }
  render() {
    const userList = this.state.friends.map((friend) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': this.state.openChatID === friend.id,
      })
      return (
      <li
        onClick={ this.changeOpenChat.bind(this, friend.id) }
        className={ itemClasses }
        key={ friend.id }
      >
        <div className='user-list__item__picture'>
          <img src={ friend.image_name } />
        </div>
        <div className='user-list__item__details'>
          <h4 className='user-list__item__name'>
            { friend.name }
          </h4>
          <span className='user-list__item__deletefriend'>
            <div
              key={ friend.id }
              onClick={ this.destroyFriend.bind(this, friend.id) }
            >
              削除
            </div>
          </span>
        </div>
      </li>
    )
    })

    return (
    <div className='user-list'>
      <ul className='user-list__list'>
        { userList }
      </ul>
    </div>
    )
  }
}

export default UserList
