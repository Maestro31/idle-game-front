import { Character } from '../character/character.interface'
import { Fighter } from './Fighter'

export default class FighterStub extends Fighter {
  constructor(private initialCharacter: Character) {
    super(initialCharacter)
  }

  overrideCharacterWith(attributes: Partial<Character>): void {
    this.character = {
      ...this.initialCharacter,
      ...attributes,
    }

    this.remainingHealth = this.character.health
  }
}
