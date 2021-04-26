import { CharacterProps } from '../character/character.interface'
import { Fighter } from './Fighter'

export default class FighterStub extends Fighter {
  constructor(private initialCharacter: CharacterProps) {
    super(initialCharacter)
  }

  overrideCharacterWith(attributes: Partial<CharacterProps>): void {
    this.characterProps = {
      ...this.initialCharacter,
      ...attributes,
    }

    this.remainingHealth = this.characterProps.health
  }
}
