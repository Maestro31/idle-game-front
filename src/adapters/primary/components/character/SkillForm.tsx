import React from 'react'
import InputCharacterSkill from './InputCharacterSkill'
import styled from '@emotion/styled'
import { flexColumnStyle } from '../styles'
import { CharacterProps } from '../../../../core/models/Character'
import { Skill } from '../../../../core/adapters/secondary/character/CharacterGatewayInterface'
import useCharacterForm from '../../hooks/useCharacter'

interface SkillFormProps {
  characterProps: CharacterProps
  increment: (skill: Skill) => (e: React.MouseEvent) => void
  decrement?: (skill: Skill) => (e: React.MouseEvent) => void
  cannotBeDecremented?: (skill: Skill) => boolean
}

export default function SkillForm({
  characterProps,
  increment,
  decrement,
  cannotBeDecremented,
}: SkillFormProps) {
  const {
    canIncrementHealth,
    canIncrementAttack,
    canIncrementMagic,
    canIncrementDefense,
  } = useCharacterForm(characterProps)

  return (
    <React.Fragment>
      <SkillPointsCount>
        {characterProps.skillPoints} points restants
      </SkillPointsCount>
      <SkillsContainer>
        <InputCharacterSkill
          label="Santé"
          increment={increment('health')}
          decrement={decrement && decrement('health')}
          disabledIncrement={!canIncrementHealth}
          disabledDecrement={
            cannotBeDecremented && cannotBeDecremented('health')
          }
        />
        <InputCharacterSkill
          label="Attaque"
          increment={increment('attack')}
          decrement={decrement && decrement('attack')}
          disabledIncrement={!canIncrementAttack}
          disabledDecrement={
            cannotBeDecremented && cannotBeDecremented('attack')
          }
        />
        <InputCharacterSkill
          label="Magie"
          increment={increment('magic')}
          decrement={decrement && decrement('magic')}
          disabledIncrement={!canIncrementMagic}
          disabledDecrement={
            cannotBeDecremented && cannotBeDecremented('magic')
          }
        />
        <InputCharacterSkill
          label="Défense"
          increment={increment('defense')}
          decrement={decrement && decrement('defense')}
          disabledIncrement={!canIncrementDefense}
          disabledDecrement={
            cannotBeDecremented && cannotBeDecremented('defense')
          }
        />
      </SkillsContainer>
    </React.Fragment>
  )
}

const SkillPointsCount = styled.h3({
  color: '#FAE056',
  fontSize: '1.5em',
  textAlign: 'center',
})

const SkillsContainer = styled.div({
  ...(flexColumnStyle as {}),
  alignItems: 'center',
})
