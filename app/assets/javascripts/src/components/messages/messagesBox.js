import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages' // 追記
import MessageAction from '../../actions/messages' // 追記
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
// import Utils from '../../utils'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return {
      messages: [],
      currentUser:[],
      openChatId: 1,
    }
  }
  componentWillMount() {
    MessageAction.getMessagesByUserId(MessagesStore.getOpenChatUserID())
    UserAction.getCurrentUser()
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange(){
    this.setState(this.getStateFromStore())
  }
  getStateFromStore(){
    return{
      messages: MessagesStore.getMessagesByUserId(MessagesStore.getOpenChatUserID()),
      currentUser: UserStore.getCurrentUser(),
      openChatId: MessagesStore.getOpenChatUserID()
    }
  }
  //  currentUserとmessagesを訂正
  render() {
    // console.log(UserStore.user.id)
    // const currentUser = this.getCurrentUserFromStore()
    // const currentUser = [
    //   {
    //     id: 1,
    //     name: "Sunny",
    //     // image_name: '/hitsujisennin.jpg',
    //   }
    // ]
    console.log(this.state.openChatId)
    console.log(this.state.currentUser.id)
    const messagesList = this.state.messages.map((message) => {
      // debugger
      const messageClasses = classNames({
        'message-box__item': true,
        // 'message-box__item--from-current': message.from_user_id === 1,
        'message-box__item--from-current': message.from_user_id === this.state.currentUser.id,
        'clear': true,
      })

      return (
            <li key={ message.id } className={ messageClasses }>
              <div className='message-box__item__contents'>
                { message.content }
              </div>
            </li>
          )
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
