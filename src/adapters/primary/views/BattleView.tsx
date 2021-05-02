import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Character from '../../../core/models/Character'
import { runFight } from '../../../core/usecases/fight/run-fight/runFight'
import { findFightResult } from '../../../redux/selectors/findFightResult'
import CharacterPreview from '../components/battle/CharacterPreview'
import LogList from '../components/battle/LogList'
import { PageContainer, SecondaryButton } from '../components/sharedComponents'
import { flexRowCenterStyle } from '../components/styles'

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

  const { winner, looser, logs } = fightResult
  const isBattleWon = winner.id === id
  const colorStyle = { color: isBattleWon ? '#6ad46c' : '#f33f3f' }
  return (
    <PageContainer>
      <h1 style={colorStyle}>
        {isBattleWon ? 'Victoire !' : 'Vous avez perdu !'}
      </h1>
      <CharactersPreview>
        <CharacterPreview
          style={{ border: '1px solid #DCE001' }}
          characterProps={Character.fromPrimitives(winner).getProps()}
        />
        <CharacterPreview
          characterProps={Character.fromPrimitives(looser).getProps()}
        />
      </CharactersPreview>
      <p style={colorStyle}>
        {winner.name} a vaincu {looser.name} en {logs.length} tours
      </p>

      <LogList logs={logs} />
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

const CharactersPreview = styled.div({
  ...(flexRowCenterStyle as {}),
  columnGap: '20px',
})
