import AssaultLog from '../../../../game/game-logger/AssaultLog'
import { CharacterDTO } from '../../../models/Character'

export default interface FightGatewayInterface {
  runFight(id: string): Promise<FightResult>
}

export interface FightResult {
  winner: CharacterDTO
  looser: CharacterDTO
  logs: AssaultLog[]
}
