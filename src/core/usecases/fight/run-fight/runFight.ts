import { ThunkResult } from '../../../../redux/configureStore'
import { FightActions } from '../actionCreators'

export const runFight =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { fightGateway }) => {
    dispatch(FightActions.fightStarted)
    const fightResult = await fightGateway.runFight(id)
    dispatch(FightActions.fightEnded(fightResult))
  }
