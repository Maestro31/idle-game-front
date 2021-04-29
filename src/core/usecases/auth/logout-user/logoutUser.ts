import { ThunkResult } from '../../../../redux/configureStore'
import { AuthActions } from '../actionCreators'

export const logoutUser: ThunkResult<Promise<void>> = async (
  dispatch,
  getState,
  { localStorageService }
) => {
  localStorageService.removeItem('auth-token')
  dispatch(AuthActions.logout())
}
