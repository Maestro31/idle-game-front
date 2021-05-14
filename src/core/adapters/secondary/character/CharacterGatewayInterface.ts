import { Skill } from '../../../../services/character.interface'
import Character from '../../../models/Character'

export interface CreateCharacterPayload {
  name: string
  skillPoints: number
  health: number
  magic: number
  defense: number
  attack: number
}

export default interface CharacterGatewayInterface {
  retrieveCharacter(id: string): Promise<Character>
  retrieveCharacters(): Promise<Character[]>
  createCharacter(character: CreateCharacterPayload): Promise<void>
  incrementSkill(skill: Skill, characterId: string): Promise<void>
  deleteCharacter(id: string): Promise<void>
}
