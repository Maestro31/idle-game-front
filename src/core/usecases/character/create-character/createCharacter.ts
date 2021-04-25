import { CharacterProps } from '../../../../game/character/character.interface'
import { ThunkResult } from '../../../../redux/configureStore'
import { retrieveCharacters } from '../retrieve-characters/retrieveCharacters'

export const createCharacter = (
  characterProps: CharacterProps
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { characterGateway }
) => {
  await characterGateway.createCharacter(characterProps)
}
