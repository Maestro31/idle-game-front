import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCharacters } from '../../../core/usecases/character/retrieve-characters/retrieveCharacters'
import { findAllCharacters } from '../../../redux/selectors/findAllCharacters'
import { PageContainer } from '../components/sharedComponents'
import CharacterDetails from '../components/character/CharacterDetails'
import CharactersGrid from '../components/character/CharactersGrid'
import { useHistory } from 'react-router'

export default function Characters() {
  const characters = useSelector(findAllCharacters)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const history = useHistory()
  const selectedCharacter = characters[selectedIndex]

  useEffect(() => {
    dispatch(retrieveCharacters)
  }, [dispatch])

  return (
    <PageContainer
      data-testid="characters-view"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '560px' }}
    >
      {selectedCharacter && (
        <CharacterDetails
          characterProps={selectedCharacter}
          actionButtonProps={
            selectedCharacter.skillPoints > 0
              ? {
                  title: 'Améliorer',
                  color: '#89af1e',
                  onClick: () =>
                    history.push(`/characters/${selectedCharacter.id}`),
                }
              : {
                  title: 'Afficher',
                  color: '#362C26',
                  onClick: () =>
                    history.push(`/characters/${selectedCharacter.id}/details`),
                }
          }
        />
      )}
      <CharactersGrid
        characters={characters}
        onCharacterSelectionChange={(index: number) => setSelectedIndex(index)}
      />
    </PageContainer>
  )
}
