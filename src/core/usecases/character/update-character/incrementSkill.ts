import { Skill } from '../../../../game/character/character.interface'
import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const incrementSkill = (
  skill: Skill,
  characterId: string
): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { characterGateway }
) => {
  try {
    const character = await characterGateway.incrementSkill(skill, characterId)
    dispatch(CharacterActions.characterUpdated(character))
  } catch (e) {
    dispatch(CharacterActions.characterUpdateFailed(e.message))
  }
}
