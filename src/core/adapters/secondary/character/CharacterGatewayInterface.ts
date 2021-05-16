import { BattleResult } from '../../../../redux/appState.interface'
import Character from '../../../models/Character'

export type Skill = 'health' | 'attack' | 'defense' | 'magic'
export interface CreateCharacterPayload {
  name: string
  health: number
  magic: number
  defense: number
  attack: number
}
export default interface CharacterGatewayInterface {
  retrieveCharacter(id: string): Promise<Character>
  retrieveCharacters(): Promise<Character[]>
  createCharacter(payload: CreateCharacterPayload): Promise<void>
  incrementSkill(skill: Skill, characterId: string): Promise<void>
  deleteCharacter(id: string): Promise<void>
  retrieveBattleResults(id: string): Promise<BattleResult[]>
}
