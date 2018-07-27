import React from 'react'
import classNames from 'classnames'
import _ from 'lodash' // 追記
import Utils from '../../utils'
import MessagesStore from '../../stores/messages' // 追記
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages' // 追記

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
      const allMessages = MessagesStore.getAllChats()

      const messageList = []
      _.each(allMessages, (message) => {
        const messagesLength = message.messages.length
        messageList.push({
          lastMessage: message.messages[messagesLength - 1],
          lastAccess: message.lastAccess,
          user: message.user,
        })
      })
      return {
        openChatID: MessagesStore.getOpenChatUserID(),
        messageList: messageList,
      }
    }
    componentWillMount() {
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
    render() {
      this.state.messageList.sort((a, b) => {
        if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
          return -1
        }
        if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
          return 1
        }
        return 0
      })

      const messages = this.state.messageList.map((message, index) => {
        const date = Utils.getNiceDate(message.lastMessage.timestamp)

        var statusIcon
        if (message.lastMessage.from !== message.user.id) {
          statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
        )
        }
        if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
          statusIcon = (
          <i className='fa fa-circle user-list__item__icon' />
        )
        }

        var isNewMessage = false
        if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
          isNewMessage = message.lastMessage.from !== UserStore.user.id
        }

        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
          'user-list__item--new': isNewMessage,
          'user-list__item--active': this.state.openChatID === message.user.id,
        })

        return (
        <li
          onClick={ this.changeOpenChat.bind(this, message.user.id) } // 追記
          className={ itemClasses }
          key={ message.user.id }
        >
          <div className='user-list__item__picture'>
            <img src={ message.user.profilePicture } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { message.user.name }
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>

            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { message.lastMessage.contents }
            </span>
          </div>
        </li>
      )
      }, this)
      return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { messages }
        </ul>
      </div>
    )
    }
}

export default UserList
