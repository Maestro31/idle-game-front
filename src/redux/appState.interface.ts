import { FightResult } from '../core/adapters/secondary/fight/FightGatewayInterface'
import { CharacterDTO } from '../core/models/Character'

export interface AppState {
  auth: AuthState
  character: {
    byId: CharactersById
    errorMessage: string | null
    battleHistoriesByCharacterId: BattleHistoriesByCharacterId
  }
  fightResult: FightResult | null
}

export interface AuthState {
  user: User | null
  errorMessage: string | null
  status: 'idle' | 'fetching' | 'connected' | 'disconnected'
}

export interface User {
  firstname: string
  lastname: string
  email: string
}

export interface CharactersById {
  [key: string]: CharacterDTO
}

export interface BattleHistoriesByCharacterId {
  [key: string]: BattleResult[]
}

export interface BattleResult {
  opponent: CharacterDTO
  status: BattleResultStatus
}

export type BattleResultStatus = 'won' | 'lost' | 'draw'
