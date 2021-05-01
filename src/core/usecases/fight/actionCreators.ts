import { ActionsUnion, createAction } from '../../../redux/customActions'
import { FightResult } from '../../adapters/secondary/fight/FightGatewayInterface'

export const FightActions = {
  fightEnded: (fightResult: FightResult) =>
    createAction('FIGHT_ENDED', { fightResult }),
}

export type FightActionTypes = ActionsUnion<typeof FightActions>
