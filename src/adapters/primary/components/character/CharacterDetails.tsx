import styled from '@emotion/styled'
import React from 'react'
import { CharacterProps } from '../../../../game/character/character.interface'
import characterImage from '../../assets/images/character.svg'
import { flexRowCenterStyle } from '../styles'

interface SkillStatProps {
  skillCount: number
  skillName: string
}

function SkillStat({ skillCount, skillName }: SkillStatProps) {
  return (
    <SkillStatContainer>
      <StatCount>{skillCount}</StatCount>
      <span>{skillName}</span>
    </SkillStatContainer>
  )
}

interface CharacterDetailsProps {
  character: CharacterProps
  actionButtonProps?: {
    title: string
    onClick: (e: React.MouseEvent) => void
    color: string
  }
}

export default function CharacterDetails({
  character,
  actionButtonProps,
}: CharacterDetailsProps) {
  return (
    <Container>
      <PreviewContainer>
        <img src={characterImage} alt="character illustration" width="75px" />
        {actionButtonProps && (
          <DetailButton
            color={actionButtonProps.color}
            onClick={actionButtonProps.onClick}
          >
            {actionButtonProps.title}
          </DetailButton>
        )}
      </PreviewContainer>
      <DetailsContainer>
        <Name>{character.name}</Name>
        <StatsContainer>
          <SkillStat skillName="Santé" skillCount={character.health} />
          <SkillStat skillName="Attaque" skillCount={character.attack} />
          <SkillStat skillName="Magie" skillCount={character.magic} />
          <SkillStat skillName="Défense" skillCount={character.defense} />
        </StatsContainer>
      </DetailsContainer>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '30vh',
})

const PreviewContainer = styled.div({
  ...(flexRowCenterStyle as {}),
  backgroundColor: '#8C7668',
  borderRadius: '5px',
  height: '100%',
  minWidth: '130px',
  flexGrow: 1,
  position: 'relative',
})

const DetailButton = styled.div(({ color }: { color: string }) => ({
  ...(flexRowCenterStyle as {}),
  position: 'absolute',
  left: '5px',
  right: '5px',
  bottom: '5px',
  height: '30px',
  backgroundColor: color ? color : '#89af1e',
  color: 'white',
  borderRadius: '3px',
}))

const DetailsContainer = styled.div({
  color: 'white',
  marginLeft: '20px',
  flexGrow: 10,
})

const Name = styled.h3({
  marginTop: 0,
  '@media (max-height: 600px)': {
    fontSize: '0.8em',
  },
})

const StatsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const SkillStatContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  color: '#DCD0CA',
  fontWeight: 'bold',
  fontSize: '1.2em',
  '@media (max-height: 600px)': {
    fontSize: '1em',
  },
})

const StatCount = styled.span({
  display: 'inline-block',
  width: '40px',
  fontWeight: 'bold',
  fontSize: '1.5em',
  textAlign: 'right',
  marginRight: '20px',
  color: 'white',
  '@media (max-height: 600px)': {
    fontSize: '1.2em',
  },
})
