import request from 'superagent'
import { APIEndpoints, CSRFToken } from '../constants/app'

export default {

  createFriend(toUserId) {
    return new Promise(() => {
      request
      .post(`${APIEndpoints.FRIENDSHIP}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId})
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('その人は既に友達です')
        }
      })
    })
  },
  
  destroyFriend(toUserId) {
    return new Promise(() => {
      request
      .post(`${APIEndpoints.FRIENDSHIP}/destroy_friend`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserId})
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('友達解除に失敗しました')
        }
      })
    })
  },
}
