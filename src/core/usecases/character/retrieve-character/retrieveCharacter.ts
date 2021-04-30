import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const retrieveCharacter = (
  id: string
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { characterGateway }
) => {
  const character = await characterGateway.retrieveCharacter(id)
  dispatch(CharacterActions.characterRetrieved(character))
}
