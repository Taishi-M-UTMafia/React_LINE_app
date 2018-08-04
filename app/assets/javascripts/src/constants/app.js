// src/constants/app.js
import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGE: APIRoot + '/messages',
  USER: APIRoot + '/users',
  FRIENDSHIP: APIRoot + '/friendships',
}

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGE: null,
  POST_MESSAGE: null,
  GET_FRIENDS: null,
  GET_SEARCH_USER: null,
  GET_CURRENT_USER: null,
  CREATE_FRIENDSHIP: null,
  DESTROY_FRIENDSHIP: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
