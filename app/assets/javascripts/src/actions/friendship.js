import request from 'superagent'
import { APIEndpoints, CSRFToken } from '../constants/app'

export default {
  createFriend(toUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIENDSHIP}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId})
      .end((error) => {
          alert('その人は既に友達です')
      })
    })
  },
  destroyFriend(toUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIENDSHIP}/destroy_friend`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId})
      .end((error) => {
          alert('友達解除に失敗しました')
      })
    })
  },
}
