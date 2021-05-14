import CharacterGatewayInterface, {
  CreateCharacterPayload,
} from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import CharacterNotFoundError from '../../../core/adapters/secondary/character/CharacterNotFoundError'
import CharacterBuilder from '../../../core/builders/CharacterBuilder'
import Character from '../../../core/models/Character'
import { Skill } from '../../../services/character.interface'
import CharacterCreator from '../../../services/CharacterCreator'
export default class InMemoryCharacterGateway
  implements CharacterGatewayInterface
{
  protected characters: Character[] = []
  private characterCreator: CharacterCreator = new CharacterCreator()
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
    this.characters = this.characters.map((character) =>
      character.id === characterId
        ? this.updateCharacter(skill, this.findCharacterById(characterId))
        : character
    )
  }

  async deleteCharacter(characterId: string): Promise<void> {
    this.characters = this.characters.filter(
      (character) => character.id !== characterId
    )
  }

  protected findCharacterById(id: string): Character {
    const character = this.characters.find((character) => character.id === id)

    if (!character) {
      throw new CharacterNotFoundError()
    }

    return character
  }

  feed(characters: Character[]) {
    this.characters = characters
  }

  getLastArgs() {
    return this.lastArgs
  }

  private updateCharacter(skill: Skill, character: Character) {
    return new CharacterBuilder()
      .withId(character.id)
      .withProps(this.characterCreator.increment(skill, character.getProps()))
      .build()
  }
}
