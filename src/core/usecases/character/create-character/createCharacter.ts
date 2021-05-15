import { ThunkResult } from '../../../../redux/configureStore'
import { CreateCharacterPayload } from '../../../adapters/secondary/character/CharacterGatewayInterface'
import { CharacterActions } from '../actionCreators'
import { retrieveCharacters } from '../retrieve-characters/retrieveCharacters'

export const createCharacter =
  (payload: CreateCharacterPayload): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { characterGateway }) => {
    try {
      await characterGateway.createCharacter(payload)
      dispatch(retrieveCharacters)
    } catch (e) {
      dispatch(CharacterActions.characterCreationFailed(e.message))
    }
  }
