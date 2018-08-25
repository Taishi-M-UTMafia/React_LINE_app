import React         from 'react'
import classNames    from 'classNames'
import ReplyBox      from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages'
import MessageAction from '../../actions/messages'
import UserStore     from '../../stores/user'
import UserAction    from '../../actions/user'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return {
      openChatID : null,
      // REVIEW(Sunny): currentUserは配列じゃない
      currentUser: {},
      messages   : [],
    }
  }

  componentWillMount() {
    UserAction.getCurrentUser()
    UserAction.getFriends() // OpenChatIDに初期値を入れるためのgetFriends()
    .then(() => MessageAction.getMessagesByUserId(this.state.openChatID))
    UserStore.onChange(this.onStoreChange)
    MessagesStore.onChange(this.onStoreChange)
  }

  componentWillUnmount() {
    // REVIEW(sunny): 動いていない
    // REVIEW(Sunny): MessagesStoreもoffChange
    UserStore.offChange(this.onStoreChange)
    MessagesStore.offChange(this.onStoreChange)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return {
      // REVIEW(Sunny): Storeにアクセスしない →これどこがだめなのか不明、再度聞く
      openChatID : MessagesStore.getOpenChatUserID(),
      currentUser: UserStore.getCurrentUser(),
      messages   : MessagesStore.getMessagesByUserId(this.state.openChatID),
    }
  }

  render() {
    const messagesList = this.state.messages.map((message) => {
      const messageClasses = classNames({
        'clear'                          : true,
        'message-box__item'              : true,
        'message-box__item--from-current': message.from_user_id === this.state.currentUser.id,
      })
      if(message.message_type === "text") {
        return (
          <li key = { message.id } className = { messageClasses }>
            <div className = 'message-box__item__contents'>{ message.content }</div>
          </li>
        )
      } else if(message.message_type === "image") {
        return (
          <li key = { message.id } className = { messageClasses }>
            <div className = 'message-box__item__contents'>
              <img className = "image_message" src = { 'message_images/' + message.content } />
            </div>
          </li>
        )
      }
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
