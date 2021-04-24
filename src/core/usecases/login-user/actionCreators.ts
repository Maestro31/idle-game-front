import { User } from '../../../redux/appState.interface'
import { ActionsUnion, createAction } from '../../../redux/customActions'

export const Actions = {
  userAuthenticated: (user: User, authToken: string) =>
    createAction('USER_AUTHENTICATED', { user, authToken }),
}

export type Actions = ActionsUnion<typeof Actions>
