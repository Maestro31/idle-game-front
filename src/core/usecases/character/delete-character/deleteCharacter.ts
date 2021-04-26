import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const deleteCharacter = (
  id: string
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { characterGateway }
) => {
  await characterGateway.deleteCharacter(id)
  dispatch(CharacterActions.characterDeleted(id))
}
