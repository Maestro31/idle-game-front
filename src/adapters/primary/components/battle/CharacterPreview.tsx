import styled from '@emotion/styled'
import React from 'react'
import { CharacterProps } from '../../../../core/models/Character'
import characterImage from '../../assets/images/character.svg'
import { flexRowCenterStyle } from '../styles'

interface CharacterStatsCountProps {
  health: number
  magic: number
  defense: number
  attack: number
  style?: React.CSSProperties
}

function CharacterStatsCount({
  health,
  magic,
  defense,
  attack,
  style,
}: CharacterStatsCountProps) {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: '5px',
      }}
    >
      <span>{attack}&nbsp;⚔️</span>
      <span>{magic}&nbsp;🪄</span>
      <span>{defense}&nbsp;🛡️</span>
      <span>{health}&nbsp;❤️</span>
    </div>
  )
}

interface CharacterPreviewProps {
  characterProps: CharacterProps
  style?: React.CSSProperties
}

export default function CharacterPreview({
  characterProps,
  style,
}: CharacterPreviewProps) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3 style={{ marginTop: 0 }}>{characterProps.name}</h3>
      <PreviewContainer style={style}>
        <RankCount>{characterProps.rank}</RankCount>
        <img src={characterImage} alt="character illustration" width="75px" />
        <CharacterStatsCount
          style={{ marginLeft: '10px' }}
          health={characterProps.health}
          attack={characterProps.attack}
          magic={characterProps.magic}
          defense={characterProps.defense}
        />
      </PreviewContainer>
    </div>
  )
}

const PreviewContainer = styled.div({
  ...(flexRowCenterStyle as {}),
  backgroundColor: '#8C7668',
  borderRadius: '5px',
  height: '100%',
  minWidth: '130px',
  minHeight: '150px',
  flexGrow: 1,
  position: 'relative',
})

const RankCount = styled.div({
  position: 'absolute',
  top: '5px',
  left: '5px',
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#DCE001',
})
