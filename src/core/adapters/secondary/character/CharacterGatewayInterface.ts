import { Skill } from '../../../../game/character/character.interface'
import Character from '../../../models/Character'

export default interface CharacterGatewayInterface {
  retrieveCharacter(id: string): Promise<Character>
  retrieveCharacters(): Promise<Character[]>
  createCharacter(character: Character): Promise<void>
  incrementSkill(skill: Skill, characterId: string): Promise<Character>
  deleteCharacter(id: string): Promise<void>
}
