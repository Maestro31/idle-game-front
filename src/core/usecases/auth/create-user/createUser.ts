import { ThunkResult } from '../../../../redux/configureStore'
import { UserProps } from '../../../models/User'
import { loginUser } from '../login-user/loginUser'

export const createUser =
  (userProps: UserProps): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { authGateway }) => {
    await authGateway.register(userProps)
    dispatch(loginUser(userProps.email, userProps.password))
  }
