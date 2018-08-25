import React            from 'react'
import classNames       from 'classnames'
import MessagesStore    from '../../stores/messages'
import MessagesAction   from '../../actions/messages'
import UserStore        from '../../stores/user'
import UserAction       from '../../actions/user'
import FriendshipAction from '../../actions/friendship'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return {
      // REVIEW(Sunny): 数字を期待しているのに、初期値がstringなのは微妙かな
      openChatID: null,
      friends   : [],
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange)
    MessagesStore.onChange(this.onStoreChange)
  }

  componentWillUnmount() {
    // REVIEW(Sunny): このoffChangeはうまく動いていない。bindで新しい関数を生成してしまっているため。
    UserStore.offChange(this.onStoreChange)
    MessagesStore.offChange(this.onStoreChange)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return {
      friends   : UserStore.getFriends(),
      // REVIEW(Sunny): 引数を消す
      openChatID: MessagesStore.getOpenChatUserID(),
    }
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
    // REVIEW(Sunny): StoreはgetStateFromStore以外から呼び出さない
    // REVIEW(Sunny): onChangeはcomponentWillMountに移す
  }

  // TODO(Sunny): 最後のユーザーを削除した時に、メッセージが残るバグがあるので修正する
  destroyFriendship(toUserId) {
    // REVIEW(Sunny): === trueは意味ない
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
          key       = { friend.id }
          onClick   = { this.changeOpenChat.bind(this, friend.id) }
          className = { itemClasses }
        >
          <div className = 'user-list__item__picture'><img src = { friend.image_name }/></div>
          <div className = 'user-list__item__details'>
            <h4   className = 'user-list__item__name'>{ friend.name }</h4>
            <span className = 'user-list__item__deletefriend'>
              <div
                key     = { friend.id }
                onClick = { this.destroyFriendship.bind(this, friend.id) }
              >
                削除
              </div>
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
