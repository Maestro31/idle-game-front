import { ThunkResult } from '../../../../redux/configureStore'
import { AuthActions } from '../actionCreators'

export const loginUser = (
  email: string,
  password: string
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { authGateway, localStorageService }
) => {
  try {
    const data = await authGateway.login(email, password)
    dispatch(AuthActions.userAuthenticated(data.user))
    localStorageService.setItem('auth-token', data.authToken)
  } catch (e) {
    dispatch(AuthActions.loginFailed(e.message))
  }
}
