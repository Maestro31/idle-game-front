import { ThunkResult } from '../../../../redux/configureStore'
import { AuthActions } from '../actionCreators'

export const refreshUser: ThunkResult<Promise<void>> = async (
  dispatch,
  getState,
  { authGateway, localStorageService }
) => {
  const authToken = localStorageService.getItem('auth-token')

  const data = await authGateway.refreshUser(authToken)

  if (data.user) {
    dispatch(AuthActions.userAuthenticated(data.user))
  } else {
    dispatch(AuthActions.logout())
  }
}
