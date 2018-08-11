import React from 'react'
// import SearchUser from './searchUser'
import UserAction from '../../actions/user'
import UserStore from '../../stores/user'
import FriendshipAction from '../../actions/friendship'

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  getStateFromStore() {
    // debugger
    UserAction.getSearchUser(this.state.value)
    return UserStore.getSearchUser()
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  createFriend(toUserId) {
    // debugger
    FriendshipAction.createFriend(toUserId)
  }

  render() {
    const users = this.getStateFromStore()
    // mapを使うときはそれぞれを区別するためにkeyを付与
    const usersLists = users.map((user) => {
      return (
        <div
          className='search_user_list_result'
          onClick= { this.createFriend.bind(this, user.id) }
          key={ user.id }
        >
          { user.name }
        </div>
      )
    })
    return (
        <div className='searchform-wrapper'>
          <input
            className='searchform'
            type='text'
            placeholder="Set your friend's name..."
            value={ this.state.value }
            onChange={ this.updateValue.bind(this) }
          />
          <div className='search_user_list'>
            { usersLists }
          </div>
        </div>
      )
  }
}
