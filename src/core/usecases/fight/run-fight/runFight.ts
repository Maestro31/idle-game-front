import { ThunkResult } from '../../../../redux/configureStore'
import Character from '../../../models/Character'
import { CharacterActions } from '../../character/actionCreators'
import { FightActions } from '../actionCreators'

export const runFight = (id: string): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
  { fightGateway }
) => {
  const fightResult = await fightGateway.runFight(id)

  if (fightResult.winner.id === id) {
    dispatch(
      CharacterActions.characterRetrieved(
        Character.fromPrimitives(fightResult.winner)
      )
    )
  }
  dispatch(FightActions.fightEnded(fightResult))
}
