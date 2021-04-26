import { ThunkResult } from '../../../../redux/configureStore'
import Character from '../../../models/Character'
import { CharacterActions } from '../actionCreators'

export const createCharacter = (
  character: Character
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { characterGateway }
) => {
  try {
    await characterGateway.createCharacter(character)
    dispatch(CharacterActions.characterCreated(character))
  } catch (e) {
    dispatch(CharacterActions.characterCreationFailed(e.message))
  }
}
