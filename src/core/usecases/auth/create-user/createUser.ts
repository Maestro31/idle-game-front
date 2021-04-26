import { ThunkResult } from '../../../../redux/configureStore'
import { UserProps } from '../../../models/User'
import { loginUser } from '../login-user/loginUser'

export const createUser = (
  id: string,
  userProps: UserProps
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { authGateway }
) => {
  await authGateway.register(id, userProps)
  dispatch(loginUser(userProps.email, userProps.password))
}
