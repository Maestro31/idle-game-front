import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const retrieveCharacters: ThunkResult<Promise<void>> = async (
  dispatch,
  getState,
  { characterGateway }
) => {
  const characters = await characterGateway.retrieveCharacters()
  dispatch(CharacterActions.charactersRetrieved(characters))
}
