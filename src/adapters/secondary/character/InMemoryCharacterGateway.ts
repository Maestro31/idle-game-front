import CharacterGatewayInterface, {
  CreateCharacterPayload,
  Skill,
} from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import CharacterNotFoundError from '../../../core/adapters/secondary/character/CharacterNotFoundError'
import Character from '../../../core/models/Character'
import { BattleResult } from '../../../redux/appState.interface'
export default class InMemoryCharacterGateway
  implements CharacterGatewayInterface
{
  private characters: Character[] = []
  private battleResults: { [key: string]: BattleResult[] } = {}
  private lastArgs: any

  async retrieveCharacters(): Promise<Character[]> {
    return this.characters
  }

  async retrieveCharacter(characterId: string): Promise<Character> {
    return this.findCharacterById(characterId)
  }

  async createCharacter(payload: CreateCharacterPayload): Promise<void> {
    this.lastArgs = payload
  }

  async incrementSkill(skill: Skill, characterId: string): Promise<void> {
    this.lastArgs = { skill, characterId }
  }

  async deleteCharacter(characterId: string): Promise<void> {
    this.lastArgs = characterId
    this.characters = this.characters.filter(
      (character) => character.id !== characterId
    )
  }

  async retrieveBattleResults(id: string): Promise<BattleResult[]> {
    return this.battleResults[id]
  }

  private findCharacterById(id: string): Character {
    const character = this.characters.find((character) => character.id === id)

    if (!character) {
      throw new CharacterNotFoundError()
    }

    return character
  }

  feed(characters: Character[]) {
    this.characters = characters
  }

  feedBattleResults(battleResults: { [key: string]: BattleResult[] }) {
    this.battleResults = battleResults
  }

  getLastArgs() {
    return this.lastArgs
  }
}
