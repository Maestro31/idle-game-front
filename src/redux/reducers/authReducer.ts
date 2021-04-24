import { AuthActions } from '../../core/usecases/auth/actionCreators'
import { AuthState } from '../appState.interface'

const initialState: AuthState = {
  user: null,
}

const auth = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        user: action.payload.user,
      }
    case 'USER_LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export default auth
