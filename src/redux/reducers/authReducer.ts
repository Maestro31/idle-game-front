import { AuthActionTypes } from '../../core/usecases/auth/actionCreators'
import { AuthState } from '../appState.interface'

const initialState: AuthState = {
  user: null,
  errorMessage: null,
  status: 'idle',
}

const auth = (state: AuthState = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case 'FETCHING_USER':
      return {
        ...state,
        errorMessage: null,
        status: 'fetching',
      }
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        errorMessage: null,
        user: action.payload.user,
        status: 'connected',
      }
    case 'USER_LOGOUT':
      return {
        ...state,
        user: null,
        status: 'disconnected',
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        status: 'disconnected',
      }
    default:
      return state
  }
}

export default auth
