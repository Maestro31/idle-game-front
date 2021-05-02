import styled from '@emotion/styled'
import { CharacterDTO } from '../../../../core/models/Character'
import CharacterCard from './CharacterCard'
import addCharacterIcon from '../../assets/icons/add-character.svg'
import battleIcon from '../../assets/icons/battle.svg'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { flexRowCenterStyle, secondaryByttonStyle } from '../styles'
import { isAfter } from 'date-fns'

interface CharactersSelectionProps {
  characters: CharacterDTO[]
  onCharacterSelectionChange: (index: number) => void
}

export default function CharactersSelection({
  characters,
  onCharacterSelectionChange,
}: CharactersSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const history = useHistory()

  function fillGridWithEmptyCard(count: number) {
    const elements: JSX.Element[] = []
    for (let i = 0; i < count; i++) {
      elements.push(<EmptyCharacterCard key={count + i} />)
    }
    return elements
  }

  const onCharacterSelected = (index: number) => (e: React.MouseEvent) => {
    setCurrentIndex(index)
    onCharacterSelectionChange(index)
  }

  return (
    <Grid>
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          selected={index === currentIndex}
          onCharacterSelected={onCharacterSelected(index)}
        />
      ))}
      {characters.length < 10 && (
        <AddCharacterButton
          key="add-button-key"
          onClick={() => history.push('/create-character')}
        >
          <img
            src={addCharacterIcon}
            width={46}
            height={46}
            alt="add character"
          />
        </AddCharacterButton>
      )}
      {fillGridWithEmptyCard(10 - characters.length - 1)}
      <BattleButton
        onClick={() => history.push(`/battle/${characters[currentIndex].id}`)}
        disabled={isAfter(
          Date.parse(characters[currentIndex].recoveredAt),
          new Date()
        )}
      >
        COMBAT <BattleIcon src={battleIcon} height={32} width={32} />
      </BattleButton>
    </Grid>
  )
}

const Grid = styled.div({
  display: 'grid',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '10px',
  rowGap: '10px',
  flexGrow: 1,
  width: '100%',
  marginTop: '20px',
})

const AddCharacterButton = styled.div({
  ...(flexRowCenterStyle as {}),
  backgroundColor: '#291f1a',
  borderRadius: '5px',
  '&:hover': {
    cursor: 'pointer',
  },
})

const EmptyCharacterCard = styled.div({
  backgroundColor: '#291f1a',
  borderRadius: '5px',
})

const BattleButton = styled.button({
  ...(secondaryByttonStyle as {}),
  ...(flexRowCenterStyle as {}),
  borderRadius: '5px',
  gridColumnEnd: 'span 2',
  fontSize: '2em',
  height: '100%',
})

const BattleIcon = styled.img({
  marginLeft: '10px',
})
