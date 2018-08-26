import React from 'react'
import UserAction from '../../actions/user'
import UserStore from '../../stores/user'
import FriendshipAction from '../../actions/friendship'

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return {
      value: '',
      users: [],
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange)
  }

  // REVIEW(Sunny):動いてない
  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return {
      users: UserStore.getSearchUser(),
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
    UserAction.getSearchUser(e.target.value)
  }

  createFriend(toUserId) {
    location.href = 'http://localhost:3000'
    FriendshipAction.createFriend(toUserId)
  }

  render() {
    const userLists = this.state.users.slice(0, 5).map((user) => {
      return (
        <div
          key = { user.id }
          className = 'search_user_list_result'
          onClick = { this.createFriend.bind(this, user.id) }
        >{ user.name }</div>
      )
    })
    return (
      <div className = 'searchform-wrapper'>
        <input
          type = 'text'
          className = 'searchform'
          placeholder = "Set your friend's name..."
          value = { this.state.value }
          onChange = { this.updateValue.bind(this) }
        />
        <div className = 'search_user_list'>{ userLists }</div>
      </div>
    )
  }
}
