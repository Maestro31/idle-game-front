import { User } from '../../../redux/appState.interface'
import { ActionsUnion, createAction } from '../../../redux/customActions'

export const AuthActions = {
  userAuthenticated: (user: User) =>
    createAction('USER_AUTHENTICATED', { user }),
  logout: () => createAction('USER_LOGOUT'),
}

export type AuthActions = ActionsUnion<typeof AuthActions>
