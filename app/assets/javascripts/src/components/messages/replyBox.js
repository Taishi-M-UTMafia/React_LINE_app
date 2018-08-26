import React          from 'react'
import UserAction     from '../../actions/user'
import MessagesStore  from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return {
      value     : '',
      openChatID: null,
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange)
  }

  // REVIEW(Sunny): 動いていない
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return{
      openChatID: MessagesStore.getOpenChatUserID(),
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // REVIEW(Sunny): Storeにアクセスしない
      // REVIEW(Sunny): データを取得するのがpostした後であることを保証する
      // REVIEW(Sunny): そもそもわざわざデータを取得しに行かないで、直接storeを更新すれば良い
      MessagesAction.postMessage(this.state.openChatID, this.state.value)
      this.setState({
        value: '',
      })
    }
  }

  postImage(e) {
    // REVIEW(Sunny): Storeにアクセスしない
    // REVIEW(Sunny): データを取得するのがpostした後であることを保証する
    MessagesAction.postImage(this.state.openChatID, e.target.files[0])
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className = 'reply-box'>
        <input
          className   = 'reply-box__input'
          placeholder = 'Type message to reply..'
          value       = { this.state.value }
          onChange    = { this.updateValue.bind(this) }
          onKeyDown   = { this.handleKeyDown.bind(this) }
        />
        <span className = 'reply-box__tip'>
          Press <span className = 'reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type     = 'file'
          name     = 'image'
          accept   = 'image/*'
          onChange = { this.postImage.bind(this) }
        />
     </div>
    )
  }
}

export default ReplyBox
