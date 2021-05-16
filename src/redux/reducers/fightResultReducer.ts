import { FightResult } from '../../core/adapters/secondary/fight/FightGatewayInterface'
import { FightActionTypes } from '../../core/usecases/fight/actionCreators'

const fightResult = (
  state: FightResult | null = null,
  action: FightActionTypes
) => {
  switch (action.type) {
    case 'FIGHT_ENDED':
      return action.payload.fightResult
    case 'FIGHT_STARTED':
      return null
    default:
      return state
  }
}

export default fightResult
