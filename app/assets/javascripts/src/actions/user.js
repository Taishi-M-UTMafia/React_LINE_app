import request         from 'superagent'
import Dispatcher      from '../dispatcher'
import { ActionTypes } from '../constants/app'

export default {
  getSearchUser(value) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/search')
      .query({ value: value })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_SEARCH_USER,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/find_current_user')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_CURRENT_USER,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  getFriends() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/find_friends')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text).reverse()
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
          // REVIEW(Sunny): 空かどうかは json.lengh > 0 で判別
          if (json .length > 0) {
            Dispatcher.handleServerAction({
              type   : ActionTypes.FIRST_OPENCHATID,
              firstID: json[0].id,
            })
          } else {
            Dispatcher.handleServerAction({
              type   : ActionTypes.FIRST_OPENCHATID,
              firstID: null,
            })
          }
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
