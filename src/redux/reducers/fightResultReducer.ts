import { combineReducers } from 'redux'
import { FightResult } from '../../core/adapters/secondary/fight/FightGatewayInterface'
import { FightActionTypes } from '../../core/usecases/fight/actionCreators'

const data = (state: FightResult | null = null, action: FightActionTypes) => {
  switch (action.type) {
    case 'FIGHT_ENDED':
      return action.payload.fightResult
    case 'FIGHT_STARTED':
    case 'FIGHT_FAILED':
      return null
    default:
      return state
  }
}

const fetching = (state: boolean = false, action: FightActionTypes) => {
  switch (action.type) {
    case 'FIGHT_STARTED':
      return true
    case 'FIGHT_ENDED':
    case 'FIGHT_FAILED':
      return false
    default:
      return state
  }
}

const errorMessage = (
  state: string | null = null,
  action: FightActionTypes
) => {
  if (action.type === 'FIGHT_FAILED') {
    return action.payload.errorMessage
  }

  return state
}

export default combineReducers({ data, fetching, errorMessage })
