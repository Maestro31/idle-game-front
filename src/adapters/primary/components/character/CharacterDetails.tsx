import styled from '@emotion/styled'
import { CharacterDTO } from '../../../../core/models/Character'
import characterImage from '../../assets/images/character.svg'

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
  character: CharacterDTO
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <Container>
      <PreviewContainer>
        <img src={characterImage} alt="character illustration" width="75px" />
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
  width: '100%',
  height: '30vh',
  display: 'flex',
})

const PreviewContainer = styled.div({
  backgroundColor: '#8C7668',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minWidth: '130px',
  flexGrow: 1,
})

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
