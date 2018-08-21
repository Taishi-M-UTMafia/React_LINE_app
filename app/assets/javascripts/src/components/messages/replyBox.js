import React from 'react'
import MessagesStore from '../../stores/messages'  // 追記
import MessagesAction from '../../actions/messages' // 追記

class ReplyBox extends React.Component {
  // 追記、開始位置
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.postMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.getMessagesByUserId(MessagesStore.getOpenChatUserID())
      this.setState({
        value: '',
      })
    }
  }
  updateImage(e) {
    MessagesAction.postImage(MessagesStore.getOpenChatUserID(), e.target.files)
    // console.log(e.target.files)
    // debugger
    MessagesAction.getMessagesByUserId(MessagesStore.getOpenChatUserID())
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }  // 追記
          onKeyDown={ this.handleKeyDown.bind(this) } // 追記
          onChange={ this.updateValue.bind(this) } // 追記
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type="file"
          ref="file"
          onChange={ this.updateImage.bind(this) }
        />
     </div>
    )
  }
}

export default ReplyBox
