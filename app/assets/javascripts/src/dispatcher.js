// dispatcher.js
import {Dispatcher} from 'flux'
import assign from 'object-assign'

const appDispatcher = assign(new Dispatcher(), {
  handleServerAction(action) {
    // これで、サーバーとビューの両方からactionを取ってこれる
    this.dispatch({
      source: 'server',
      action: action,
    })
  },

  handleViewAction(action) {
    this.dispatch({
      source: 'view',
      action: action,
    })
  },
})

export default appDispatcher
