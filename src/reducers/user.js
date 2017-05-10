import { SET_USER } from '../actions'

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      const d = action.data
      return {
        displayName: d.displayName,
        email: d.email,
        photoUrl: d.photoUrl,
        id: d.uid,
        userToken: d.userToken
      }
    default:
      return state
  }
}

export default user
