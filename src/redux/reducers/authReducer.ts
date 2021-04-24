import { Actions } from '../../core/usecases/login-user/actionCreators'
import { AuthState } from '../appState.interface'

const initialState: AuthState = {
  user: null,
  authToken: null,
}

const auth = (state: AuthState = initialState, action: Actions) => {
  if (action.type === 'USER_AUTHENTICATED') {
    return {
      ...state,
      user: action.payload.user,
      authToken: action.payload.authToken,
    }
  }

  return state
}

export default auth
