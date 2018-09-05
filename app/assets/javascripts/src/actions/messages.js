import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes, APIEndpoints, CSRFToken } from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type  : ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
    this.getOpenChatMessages(newUserID)
  },

  getMessagesByFriendID(friend, friendID) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages')
      .query({ open_chat_id: friendID })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type  : ActionTypes.GET_MESSAGE_BY_ID,
            friend: friend,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  getOpenChatMessages(openChatID) {
    debugger
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages')
      .query({ open_chat_id: openChatID })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_OPEN_CHAT_MESSAGE,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  postMessage(openChatID, value) {
    return new Promise(() => {
      request
      .post(`${APIEndpoints.MESSAGE}/post_message`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ open_chat_id: openChatID, value: value })
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('メッセージが空欄または長すぎるため、送信できませんでした')
        } else {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_OPEN_CHAT_MESSAGE,
            json,
          })
        }
      })
    })
  },

  destroyMessage(openChatID, messageID) {
    return new Promise(() => {
      request
      .del(`${APIEndpoints.MESSAGE}/destroy_message`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ open_chat_id: openChatID, message_id: messageID })
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('メッセージの削除に失敗しました')
        } else {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_OPEN_CHAT_MESSAGE,
            json,
          })
        }
      })
    })
  },

  postImage(openChatID, image) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGE}/post_image`)
      .set('X-CSRF-Token', CSRFToken())
      .query({ open_chat_id: openChatID })
      .attach('image', image)
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('画像を送信できませんでした')
        } else {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_OPEN_CHAT_MESSAGE,
            json,
          })
        }
      })
    })
  },
}
