import Character from '../../../models/Character'

export default interface CharacterGatewayInterface {
  retrieveCharacters(): Promise<Character[]>
  createCharacter(character: Character): Promise<void>
}
