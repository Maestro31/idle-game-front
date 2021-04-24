import { ThunkResult } from '../../../redux/configureStore'
import { UserProps } from '../../models/User'

export const createUser = (
  userProps: UserProps
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { authGateway }
) => {
  await authGateway.register(userProps)
}
