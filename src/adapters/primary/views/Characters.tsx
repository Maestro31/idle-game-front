import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCharacters } from '../../../core/usecases/character/retrieve-characters/retrieveCharacters'
import { findAllCharacters } from '../../../redux/selectors/findAllCharacters'
import { PageContainer } from '../components/sharedComponents'
import CharacterDetails from '../components/character/CharacterDetails'
import CharactersGrid from '../components/character/CharactersGrid'

export default function Characters() {
  const characters = useSelector(findAllCharacters)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedCharacter = characters[selectedIndex]

  useEffect(() => {
    dispatch(retrieveCharacters)
  }, [dispatch])

  return (
    <PageContainer
      data-testid="characters-view"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '560px' }}
    >
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
      <CharactersGrid
        characters={characters}
        onCharacterSelectionChange={(index: number) => setSelectedIndex(index)}
      />
    </PageContainer>
  )
}
