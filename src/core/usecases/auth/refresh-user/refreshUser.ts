import { ThunkResult } from '../../../../redux/configureStore'
import { AuthActions } from '../actionCreators'

export const refreshUser: ThunkResult<Promise<void>> = async (
  dispatch,
  getState,
  { authGateway, localStorageService }
) => {
  dispatch(AuthActions.fetchingUser())
  const authToken = localStorageService.getItem('auth-token')

  if (!authToken) {
    dispatch(AuthActions.logout())
    return
  }

  const data = await authGateway.refreshUser(authToken)

  if (data.user) {
    dispatch(AuthActions.userAuthenticated(data.user))
  } else {
    dispatch(AuthActions.logout())
  }
}
