import request from 'superagent'
// import Dispatcher from '../dispatcher'
// import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import { APIEndpoints, CSRFToken } from '../constants/app'
// import { ActionTypes } from '../constants/app'

export default {
  createFriend(toUserId) {
    return new Promise((resolve, reject) => {
      // debugger
      request
      .post(`${APIEndpoints.FRIENDSHIP}`) // OK
      .set('X-CSRF-Token', CSRFToken()) // OK
      .send({to_user_id: toUserId}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end()
      // debugger
    })
  },
  destroyFriend(toUserId) {
    // debugger
    return new Promise((resolve, reject) => {
      // debugger
      request
      .post(`${APIEndpoints.FRIENDSHIP}/destroy_friend`) // OK
      .set('X-CSRF-Token', CSRFToken()) // OK
      .send({to_user_id: toUserId}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end()
      // debugger
    })
  },
}
