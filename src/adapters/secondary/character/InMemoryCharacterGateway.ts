import CharacterGatewayInterface from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import CharacterLimitReachedError from '../../../core/adapters/secondary/character/CharacterLimitReachedError'
import Character from '../../../core/models/Character'
export default class InMemoryCharacterGateway
  implements CharacterGatewayInterface {
  private characters: Character[] = []

  async retrieveCharacters(): Promise<Character[]> {
    return Promise.resolve(this.characters)
  }

  async createCharacter(character: Character): Promise<void> {
    if (this.characters.length + 1 >= 10) {
      throw new CharacterLimitReachedError()
    }

    this.characters.push(character)
  }

  feed(characters: Character[]) {
    this.characters = characters
  }
}
