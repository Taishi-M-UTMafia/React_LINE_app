import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  getMessagesByUserId(openChatID) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages')
      .query({openChatID: openChatID})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGE,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  postMessage(openChatId, value) {
    return new Promise(() => {
      request
      .post(`${APIEndpoints.MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({open_chat_id: openChatId, value: value})
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('メッセージが空欄または長すぎるため、送信できませんでした')
        }
      })
    })
  },
  postImage(openChatId, image) {
    // debugger
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGE}/post_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', )
      // .send({open_chat_id: openChatId, image: image})
      .end()
      // .end((error,res) => {
      //   if (error || !(res.status === 200)){
      //     alert('写真が送信できませんでした')
      //   }
      // })
    })
  },
}
