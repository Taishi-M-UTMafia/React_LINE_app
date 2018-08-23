import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

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

  postImage(e) {
    MessagesAction.postImage(MessagesStore.getOpenChatUserID(), e.target.files[0])
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
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type='file'
          name='image'
          accept="image/*"
          onChange={ this.postImage.bind(this) }
        />
     </div>
    )
  }
}

export default ReplyBox
