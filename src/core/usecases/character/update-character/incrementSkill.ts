import { Skill } from '../../../../services/character.interface'
import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const incrementSkill =
  (skill: Skill, characterId: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { characterGateway }) => {
    try {
      await characterGateway.incrementSkill(skill, characterId)
      const character = await characterGateway.retrieveCharacter(characterId)
      dispatch(CharacterActions.characterUpdated(character))
    } catch (e) {
      dispatch(CharacterActions.characterUpdateFailed(e.message))
    }
  }
