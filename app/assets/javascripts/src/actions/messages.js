// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
      userID: newUserID,
    })
  },
  // 追記
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE, // 変更箇所
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
  // getの場合
  getMessage() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages') // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGE,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // postの場合
  postMessage(MessageId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGE}`) // 後ほど説明します。
      .set('X-CSRF-Token', CSRFToken()) // 後ほど説明します。
      .send({message_id: MessageId}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_MESSAGE,
            hogeId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

}
