import styled from '@emotion/styled'
import React from 'react'
import { CharacterDTO } from '../../../../core/models/Character'
import characterImage from '../../assets/images/character.svg'
import upIcon from '../../assets/icons/up.svg'
import recoveryIcon from '../../assets/icons/recovery.svg'
import { flexRowCenterStyle } from '../styles'
import { intervalToDuration, isAfter } from 'date-fns'

interface CharacterCardProps {
  character: CharacterDTO
  selected: boolean
  onCharacterSelected: (e: React.MouseEvent) => void
}

export default function CharacterCard({
  character,
  selected,
  onCharacterSelected,
}: CharacterCardProps) {
  const canUpSkill = character.skillPoints > 0
  const canFight = Date.parse(character.recoveredAt) < Date.now()

  let recoveryDuration = null

  if (isAfter(Date.parse(character.recoveredAt), new Date())) {
    recoveryDuration = intervalToDuration({
      start: new Date(),
      end: Date.parse(character.recoveredAt),
    })
  }

  return (
    <Container
      selected={selected}
      onClick={onCharacterSelected}
      up={!!canUpSkill}
      disabled={!canFight}
    >
      {character && (
        <React.Fragment>
          <Rank>{character.rank}</Rank>
          <img src={characterImage} alt="character illustration" width="75px" />
          {canUpSkill && (
            <Up>
              <img src={upIcon} alt="up character" />
            </Up>
          )}
          {recoveryDuration && (
            <RecoveryTime>
              <img src={recoveryIcon} alt="recovery time" />
              <span>{recoveryDuration.minutes}m</span>
            </RecoveryTime>
          )}
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div(
  ({
    selected,
    up,
    disabled,
  }: {
    selected: boolean
    up: boolean
    disabled: boolean
  }) => ({
    ...(flexRowCenterStyle as {}),
    minWidth: '80px',
    minHeight: '80px',
    backgroundColor: disabled ? '#7b1717' : '#8F7769',
    borderRadius: '5px',
    position: 'relative',
    border: selected
      ? '2px solid white'
      : up
      ? '2px solid #BAEC2D'
      : '2px solid transparent',
    '&:hover': {
      cursor: 'pointer',
    },
  })
)

const Rank = styled.div({
  position: 'absolute',
  left: '5px',
  top: '5px',
  color: '#DCE001',
})

const Up = styled.div({
  position: 'absolute',
  bottom: '5px',
  right: '5px',
})

const RecoveryTime = styled.div({
  ...(flexRowCenterStyle as {}),
  position: 'absolute',
  left: '5px',
  bottom: '5px',
  fontSize: '0.8em',
  columnGap: '5px',
})
