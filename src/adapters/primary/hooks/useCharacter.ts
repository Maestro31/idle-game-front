import { Skill } from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import { CharacterProps } from '../../../core/models/Character'

function calculateNextIncrementSkillCost(
  skill: Skill,
  skillCount: number
): number {
  if (skill === 'health') return 1
  return Math.max(Math.ceil(skillCount / 5), 1)
}

const canIncrementSkill =
  (characterProps: CharacterProps) => (skill: Skill) => {
    const count = calculateNextIncrementSkillCost(skill, characterProps[skill])
    return characterProps.skillPoints >= count
  }

export default function useCharacterForm(characterProps: CharacterProps) {
  const canIncrementHealth = canIncrementSkill(characterProps)('health')
  const canIncrementAttack = canIncrementSkill(characterProps)('attack')
  const canIncrementMagic = canIncrementSkill(characterProps)('magic')
  const canIncrementDefense = canIncrementSkill(characterProps)('defense')

  return {
    canIncrementHealth,
    canIncrementAttack,
    canIncrementMagic,
    canIncrementDefense,
  }
}
