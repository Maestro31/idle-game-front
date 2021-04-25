import CharacterGatewayInterface from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import { CharacterProps } from '../../../game/character/character.interface'
import { Character } from '../../../redux/appState.interface'
import { v4 as uuid } from 'uuid'

export default class InMemoryCharacterGateway
  implements CharacterGatewayInterface {
  private characters: Character[] = []

  async retrieveCharacters(): Promise<Character[]> {
    return Promise.resolve(this.characters)
  }

  async createCharacter(characterProps: CharacterProps): Promise<void> {
    this.characters.push({
      id: uuid(),
      properties: characterProps,
    })
  }

  feed(characters: Character[]) {
    this.characters = characters
  }
}
