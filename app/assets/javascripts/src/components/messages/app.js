import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'

class App extends React.Component {
  render() {
    return (
      <div className = 'app'>
        <UserList />
        <MessagesBox />
      </div>
    )
  }
  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // }
  //
  // get initialState() {
  //   return {
  //     showUserList: true
  //   }
  // }
  //
  // componentWillMount() {
  //   setTimeout(() => {
  //     this.setState({showUserList: false})
  //   }, 1000)
  // }
  // render() {
  //   return (
  //     <div className = 'app'>
  //       {this.state.showUserList ? <UserList /> : null}
  //       <MessagesBox />
  //     </div>
  //   )
  // }
}

export default App
