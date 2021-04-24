import { Character, Skill } from './character.interface'

export default class CharacterCreator {
  createCharacter(name: string): Character {
    return {
      name,
      skillPoints: 12,
      health: 10,
      attack: 0,
      defense: 0,
      magic: 0,
    }
  }

  increment(skill: Skill, character: Character): Character {
    const { skillPoints } = character

    if (this.hasNotEnoughSkillPoints(skill, character)) {
      return character
    }

    return {
      ...character,
      skillPoints: skillPoints - this.calculateCost(skill, character[skill]),
      [skill]: character[skill] + 1,
    }
  }

  decrement(skill: Skill, character: Character): Character {
    const { skillPoints } = character

    if (this.cannotBeDecremented(character[skill])) {
      return character
    }

    return {
      ...character,
      skillPoints: skillPoints + this.calculateRefund(skill, character[skill]),
      [skill]: character[skill] - 1,
    }
  }

  private hasNotEnoughSkillPoints(skill: Skill, character: Character): boolean {
    return character.skillPoints < this.calculateCost(skill, character[skill])
  }

  private cannotBeDecremented(skillValue: number) {
    return skillValue === 0
  }

  private calculateCost(skill: Skill, currentValue: number) {
    if (skill === 'health') return 1

    const cost = Math.ceil(currentValue / 5)
    return Math.max(cost, 1)
  }

  private calculateRefund(skill: Skill, currentValue: number) {
    return this.calculateCost(skill, currentValue - 1)
  }
}
