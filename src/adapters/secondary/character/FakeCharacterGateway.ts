import Character, { CharacterDTO } from '../../../core/models/Character'
import { Skill } from '../../../game/character/character.interface'
import InMemoryCharacterGateway from './InMemoryCharacterGateway'

export default class FakeCharacterGateway extends InMemoryCharacterGateway {
  constructor() {
    super()
    this.loadCharacters()
  }

  async retrieveCharacters(): Promise<Character[]> {
    this.loadCharacters()
    return Promise.resolve(this.characters)
  }

  async retrieveCharacter(characterId: string): Promise<Character> {
    this.loadCharacters()
    const character = this.findCharacterById(characterId)
    return Promise.resolve(character)
  }

  async createCharacter(character: Character): Promise<void> {
    this.loadCharacters()
    await super.createCharacter(character)
    this.saveCharacters()
    return Promise.resolve()
  }

  async deleteCharacter(characterId: string): Promise<void> {
    this.loadCharacters()
    await super.deleteCharacter(characterId)
    this.saveCharacters()
    return Promise.resolve()
  }

  async incrementSkill(skill: Skill, characterId: string): Promise<Character> {
    this.loadCharacters()
    const characterUpdated = await super.incrementSkill(skill, characterId)
    this.characters = [
      ...this.characters.map((character) =>
        character.id === characterUpdated.id ? characterUpdated : character
      ),
    ]
    this.saveCharacters()
    return Promise.resolve(characterUpdated)
  }

  private loadCharacters() {
    const json = localStorage.getItem('characters')
    if (!json) return

    const rawCharacters = JSON.parse(json)
    this.characters = rawCharacters.map((rawCharacter: CharacterDTO) =>
      Character.fromPrimitives(rawCharacter)
    )
  }

  private saveCharacters() {
    const rawCharacters = this.characters.map((character) =>
      character.toPrimitives()
    )
    localStorage.setItem('characters', JSON.stringify(rawCharacters))
  }
}
