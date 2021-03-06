import styled from '@emotion/styled'
import decreaseIcon from '../../assets/icons/decrease.svg'
import increaseIcon from '../../assets/icons/increase.svg'
import React from 'react'
import { flexRowCenterStyle, secondaryByttonStyle } from '../styles'

interface InputCharacterSkillProps {
  increment: (e: React.MouseEvent) => void
  decrement?: (e: React.MouseEvent) => void
  disabledIncrement?: boolean
  disabledDecrement?: boolean
  label: string
}

export default function InputCharacterSkill({
  increment,
  decrement,
  disabledIncrement = false,
  disabledDecrement = false,
  label,
}: InputCharacterSkillProps) {
  return (
    <InputSkillContainer>
      {decrement && (
        <SkillButton onClick={decrement} disabled={disabledDecrement}>
          <img src={decreaseIcon} alt="decrease skill" height={30} width={30} />
        </SkillButton>
      )}
      <SkillName>{label}</SkillName>
      <SkillButton onClick={increment} disabled={disabledIncrement}>
        <img src={increaseIcon} alt="decrease skill" height={30} width={30} />
      </SkillButton>
    </InputSkillContainer>
  )
}

const InputSkillContainer = styled.div({
  ...(flexRowCenterStyle as {}),
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '15px',
})

const SkillButton = styled.button({
  ...(secondaryByttonStyle as {}),
  ...(flexRowCenterStyle as {}),
  borderRadius: '5px',
  height: '40px',
  width: '40px',
  border: '1px solid #FAE056',

  '&:disabled': {
    border: 'none',
  },
})

const SkillName = styled.span({
  fontSize: '1.5em',
  fontWeight: 'normal',
})
