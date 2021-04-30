import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { findCharacterById } from '../../../redux/selectors/findCharacterById'
import { PageContainer } from '../components/sharedComponents'
import CharacterDetails from '../components/character/CharacterDetails'

export default function CharacterView() {
  const { id } = useParams<{ id: string }>()
  const character = useSelector(findCharacterById(id))
  const history = useHistory()

  return (
    <PageContainer>
      <CharacterDetails
        character={character}
        actionButtonProps={{
          title: 'Supprimer',
          color: '#a93232',
          onClick: () => history.push(`/characters/${id}/delete`),
        }}
      />
    </PageContainer>
  )
}
