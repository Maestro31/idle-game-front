import CharacterGatewayInterface from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import CharacterLimitReachedError from '../../../core/adapters/secondary/character/CharacterLimitReachedError'
import CharacterNotFoundError from '../../../core/adapters/secondary/character/CharacterNotFoundError'
import InsufficientSkillPointsError from '../../../core/adapters/secondary/character/InsufficientSkillPointsError'
import CharacterBuilder from '../../../core/builders/CharacterBuilder'
import Character from '../../../core/models/Character'
import { Skill } from '../../../game/character/character.interface'
import CharacterCreator from '../../../game/character/CharacterCreator'
export default class InMemoryCharacterGateway
  implements CharacterGatewayInterface {
  private characters: Character[] = []
  private characterCreator: CharacterCreator = new CharacterCreator()

  async retrieveCharacters(): Promise<Character[]> {
    return Promise.resolve(this.characters)
  }

  async createCharacter(character: Character): Promise<void> {
    this.guardShouldNotHaveMoreThanTenCharacters()
    this.characters.push(character)
  }

  async incrementSkill(skill: Skill, characterId: string): Promise<Character> {
    const character = this.findCharacterById(characterId)
    this.guardShouldHaveEnoughSkillPoints(skill, character)
    const characterUpdated = this.updateCharacter(skill, character)
    return Promise.resolve(characterUpdated)
  }

  async deleteCharacter(characterId: string): Promise<void> {
    this.characters = this.characters.filter(
      (character) => character.id !== characterId
    )
    return Promise.resolve()
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

  private guardShouldHaveEnoughSkillPoints(
    skill: Skill,
    character: Character
  ): void {
    if (
      this.characterCreator.hasNotEnoughSkillPoints(skill, character.getProps())
    ) {
      throw new InsufficientSkillPointsError()
    }
  }

  private guardShouldNotHaveMoreThanTenCharacters() {
    if (this.characters.length + 1 >= 10) {
      throw new CharacterLimitReachedError()
    }
  }

  private updateCharacter(skill: Skill, character: Character) {
    return new CharacterBuilder()
      .withId(character.id)
      .withProps(this.characterCreator.increment(skill, character.getProps()))
      .build()
  }
}
