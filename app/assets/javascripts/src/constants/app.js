// src/constants/app.js
import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGE: APIRoot + '/messages',
}

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGE: null,
  POST_MESSAGE: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
