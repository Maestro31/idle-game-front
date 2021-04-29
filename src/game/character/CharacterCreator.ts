import { CharacterProps, Skill } from './character.interface'

export default class CharacterCreator {
  createCharacterProps(name: string): CharacterProps {
    return {
      name,
      skillPoints: 12,
      health: 10,
      attack: 0,
      defense: 0,
      magic: 0,
      rank: 0,
    }
  }

  increment(skill: Skill, characterProps: CharacterProps): CharacterProps {
    const { skillPoints } = characterProps

    if (this.hasNotEnoughSkillPoints(skill, characterProps)) {
      return characterProps
    }

    return {
      ...characterProps,
      skillPoints:
        skillPoints - this.calculateCost(skill, characterProps[skill]),
      [skill]: characterProps[skill] + 1,
    }
  }

  decrement(skill: Skill, characterProps: CharacterProps): CharacterProps {
    const { skillPoints } = characterProps

    if (this.cannotBeDecremented(skill, characterProps)) {
      return characterProps
    }

    return {
      ...characterProps,
      skillPoints:
        skillPoints + this.calculateRefund(skill, characterProps[skill]),
      [skill]: characterProps[skill] - 1,
    }
  }

  giveReward(characterProps: CharacterProps): CharacterProps {
    return {
      ...characterProps,
      rank: characterProps.rank + 1,
      skillPoints: characterProps.skillPoints + 1,
    }
  }

  hasNotEnoughSkillPoints(
    skill: Skill,
    characterProps: CharacterProps
  ): boolean {
    return (
      characterProps.skillPoints <
      this.calculateCost(skill, characterProps[skill])
    )
  }

  private cannotBeDecremented(skill: Skill, characterProps: CharacterProps) {
    return (
      characterProps[skill] === 0 ||
      (skill === 'health' && characterProps.health === 10)
    )
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
