import React from 'react'
import classNames from 'classnames'
// import _ from 'lodash' // 追記
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages' // 追記
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages' // 追記
import UserAction from '../../actions/user'
import FriendshipAction from '../../actions/friendship'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    // 変更箇所、開始位置
    return this.getStateFromStore()
  }

    getStateFromStore() {
      // const allMessages = MessagesStore.getAllChats()
      //
      // const messageList = []
      // _.each(allMessages, (message) => {
      //   const messagesLength = message.messages.length
      //   messageList.push({
      //     lastMessage: message.messages[messagesLength - 1],
      //     user: message.user,
      //   })
      // })
      return {
        openChatID: MessagesStore.getOpenChatUserID(),
        // messageList: messageList,
      }
    }
    componentWillMount() {
      // debugger
      UserAction.getFriends()
      MessagesStore.onChange(this.onStoreChange.bind(this))
    }
    componentWillUnmount() {
      MessagesStore.offChange(this.onStoreChange.bind(this))
    }
    onStoreChange() {
      this.setState(this.getStateFromStore())
    }
    // 終了位置
    changeOpenChat(id) {
      MessagesAction.changeOpenChat(id) // 追記
    }

    destroyFriend(toUserId) {
      // debugger
      FriendshipAction.destroyFriend(toUserId)
    }
    getFriendsFromStore() {
      UserAction.getFriends()
      return UserStore.getFriends()
    }
    render() {
      // const friends = this.getFriendsFromStore()
      const friends = [
        {
          id: 1,
          name: 'ひつじせんにん',
          image_name: '/hitsujisennin.jpg',
        },
        {
          id: 2,
          name: 'にんじゃわんこ',
          image_name: '/ninjawanko.png',
        },
      ]
      console.log(friends)
      debugger
      const userList = friends.map((friend) => {
        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
          // 'user-list__item--new': isNewMessage,
          // ここ変えてるよ！
          'user-list__item--active': this.state.openChatID === friend.id,
        })

        return (
        <li
          onClick={ this.changeOpenChat.bind(this, friend.id) } // 追記
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
