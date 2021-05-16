import { CharacterDTO } from '../../../models/Character'
export interface AssaultLog {
  turn: number
  assailant: CharacterDTO
  assailed: CharacterDTO
  assaultResult: {
    attack: number
    damageTaken: number
  }
}

export default interface FightGatewayInterface {
  runFight(id: string): Promise<FightResult>
}

export interface FightResult {
  winner: CharacterDTO
  looser: CharacterDTO
  logs: AssaultLog[]
  draw: boolean
}
