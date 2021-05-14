import { ThunkResult } from '../../../../redux/configureStore'
import { CreateCharacterPayload } from '../../../adapters/secondary/character/CharacterGatewayInterface'
import { CharacterActions } from '../actionCreators'
import { retrieveCharacters } from '../retrieve-characters/retrieveCharacters'

export const createCharacter =
  (character: CreateCharacterPayload): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { characterGateway }) => {
    try {
      await characterGateway.createCharacter(character)
      dispatch(retrieveCharacters)
    } catch (e) {
      dispatch(CharacterActions.characterCreationFailed(e.message))
    }
  }
