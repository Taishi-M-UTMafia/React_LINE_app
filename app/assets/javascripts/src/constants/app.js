import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  USER      : APIRoot + '/users',
  MESSAGE   : APIRoot + '/messages',
  FRIENDSHIP: APIRoot + '/friendships',
}

export const ActionTypes = keyMirror({
  GET_OPEN_CHAT_MESSAGE: null,
  GET_MESSAGE_BY_ID    : null,
  POST_MESSAGE         : null,
  GET_FRIENDS          : null,
  GET_SEARCH_USER      : null,
  GET_CURRENT_USER     : null,
  UPDATE_OPEN_CHAT_ID  : null,
  FRIENDSHIP_SAVE      : null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
