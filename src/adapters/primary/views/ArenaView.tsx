import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Character from '../../../core/models/Character'
import { runFight } from '../../../core/usecases/fight/run-fight/runFight'
import { findFightResult } from '../../../redux/selectors/findFightResult'
import CharacterDetails from '../components/character/CharacterDetails'
import { PageContainer, SecondaryButton } from '../components/sharedComponents'

export default function ArenaView() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const dispatch = useDispatch()
  const fightResult = useSelector(findFightResult)

  useEffect(() => {
    dispatch(runFight(id))
  }, [dispatch, id])

  if (!fightResult) {
    return <div></div>
  }

  return (
    <PageContainer>
      <h1>
        {fightResult.winner.id === id ? 'Victoire !' : 'Vous avez perdu !'}
      </h1>
      <CharacterDetails
        characterProps={Character.fromPrimitives(fightResult.winner).getProps()}
      />
      <p>Combat mené en {fightResult.logs.length} tours</p>
      <ul>
        {fightResult.logs.map((log, index) => (
          <li key={index}>
            <pre>
              {log.assailant.name} {log.assaultResult.attack} ⚔️{' '}
              {log.assailant.magic ===
                log.assaultResult.attack - log.assailed.defense &&
                'Critique Magique'}
              {log.assailed.name} -{log.assaultResult.damageTaken} 💔{' '}
              {log.assailed.defense} 🛡️
            </pre>
          </li>
        ))}
      </ul>
      <ButtonContainer>
        <BackButton onClick={() => history.push('/')}>
          Revenir au choix des personnages
        </BackButton>
      </ButtonContainer>
    </PageContainer>
  )
}

const ButtonContainer = styled.div({
  display: 'flex',
  flexGrow: 1,
  width: '100%',
})

const BackButton = styled(SecondaryButton)({
  alignSelf: 'flex-end',
})
