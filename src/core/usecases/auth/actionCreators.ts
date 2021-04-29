import { User } from '../../../redux/appState.interface'
import { ActionsUnion, createAction } from '../../../redux/customActions'

export const AuthActions = {
  userAuthenticated: (user: User) =>
    createAction('USER_AUTHENTICATED', { user }),
  logout: () => createAction('USER_LOGOUT'),
  loginFailed: (errorMessage: string) =>
    createAction('LOGIN_FAILED', { errorMessage }),
  fetchingUser: () => createAction('FETCHING_USER'),
}

export type AuthActionTypes = ActionsUnion<typeof AuthActions>
