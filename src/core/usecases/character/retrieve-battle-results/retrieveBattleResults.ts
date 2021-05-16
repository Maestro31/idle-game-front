import { ThunkResult } from '../../../../redux/configureStore'
import { CharacterActions } from '../actionCreators'

export const retrieveBattleResults =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { characterGateway }) => {
    const battleResults = await characterGateway.retrieveBattleResults(id)
    dispatch(CharacterActions.battleResultsRetrieved(id, battleResults))
  }
