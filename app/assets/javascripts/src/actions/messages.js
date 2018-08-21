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
  getMessagesByUserId(openChatID) {
    // debugger
    // Promiseでインスタンスを作る
    return new Promise((resolve, reject) => {
      // こっからsuperAgent
      request
      .get('/api/messages') // 取得したいjsonがあるURLを指定する
      .query({openChatID: openChatID})
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          // debugger
          // dispatcherからサーバーのアクションを取ってくる
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
  postMessage(openChatId, value) {
    // debugger
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGE}`) // OK
      .set('X-CSRF-Token', CSRFToken()) // OK
      .send({open_chat_id: openChatId, value: value}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error) => {
          alert('メッセージが長すぎるか何も入力されていないため、送信できませんでした')
      })
    })
  },
}
