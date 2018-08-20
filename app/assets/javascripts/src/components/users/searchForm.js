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
      users: [],
    }
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore() {
    return{
      users: UserStore.getSearchUser()
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
    UserAction.getSearchUser(e.target.value)
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  createFriend(toUserId) {
    location.href = 'http://localhost:3000'
    FriendshipAction.createFriend(toUserId)
  }
  render() {
    console.log(this.state.users)
    const userLists = this.state.users.slice(0,5).map((user,i) => {
      console.log(i)
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
            { userLists }
          </div>
        </div>
      )
  }
}
