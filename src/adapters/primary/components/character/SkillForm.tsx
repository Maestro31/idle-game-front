import React from 'react'
import InputCharacterSkill from './InputCharacterSkill'
import styled from '@emotion/styled'
import { Skill } from '../../../../game/character/character.interface'
import { flexColumnStyle } from '../styles'
import { CharacterProps } from '../../../../game/character/character.interface'

interface SkillFormProps {
  characterProps: CharacterProps
  increment: (skill: Skill) => (e: React.MouseEvent) => void
  decrement?: (skill: Skill) => (e: React.MouseEvent) => void
}

export default function SkillForm({
  characterProps,
  increment,
  decrement,
}: SkillFormProps) {
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
        />
        <InputCharacterSkill
          label="Attaque"
          increment={increment('attack')}
          decrement={decrement && decrement('attack')}
        />
        <InputCharacterSkill
          label="Magie"
          increment={increment('magic')}
          decrement={decrement && decrement('magic')}
        />
        <InputCharacterSkill
          label="Défense"
          increment={increment('defense')}
          decrement={decrement && decrement('defense')}
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
