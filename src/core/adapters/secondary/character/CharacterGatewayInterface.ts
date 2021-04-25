import { CharacterProps } from '../../../../game/character/character.interface'
import { Character } from '../../../../redux/appState.interface'

export default interface CharacterGatewayInterface {
  retrieveCharacters(): Promise<Character[]>
  createCharacter(characterProps: CharacterProps): Promise<void>
}
