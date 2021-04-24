import InvalidCredentialsError from '../../../adapters/secondary/auth/InvalidCredentialsError'
import { ThunkResult } from '../../../redux/configureStore'
import { Actions } from './actionCreators'
export const loginUser = (
  email: string,
  password: string
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { authGateway }
) => {
  try {
    const data = await authGateway.login(email, password)
    dispatch(Actions.userAuthenticated(data.user, data.authToken))
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return
    }
  }
}
