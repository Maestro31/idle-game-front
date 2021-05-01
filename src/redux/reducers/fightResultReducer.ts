import { FightResult } from '../../core/adapters/secondary/fight/FightGatewayInterface'
import { FightActionTypes } from '../../core/usecases/fight/actionCreators'

const fightResult = (
  state: FightResult | null = null,
  action: FightActionTypes
) => {
  if (action.type === 'FIGHT_ENDED') {
    return action.payload.fightResult
  }

  return state
}

export default fightResult
