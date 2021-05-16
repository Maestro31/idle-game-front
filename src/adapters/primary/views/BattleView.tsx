import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Character from '../../../core/models/Character'
import { runFight } from '../../../core/usecases/fight/run-fight/runFight'
import {
  findFightErrorMessage,
  findFightFetching,
  findFightResult,
} from '../../../redux/selectors/battleSelectors'
import CharacterPreview from '../components/battle/CharacterPreview'
import LogList from '../components/battle/LogList'
import HomeButton from '../components/HomeButton'
import { PageContainer } from '../components/sharedComponents'
import { flexRowCenterStyle } from '../components/styles'

export default function ArenaView() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const fightResult = useSelector(findFightResult(id))
  const errorMessage = useSelector(findFightErrorMessage)
  const fetching = useSelector(findFightFetching)

  useEffect(() => {
    dispatch(runFight(id))
  }, [dispatch, id])

  if (errorMessage) {
    return (
      <PageContainer>
        <p style={{ color: 'white' }}>{errorMessage}</p>
        <HomeButton />
      </PageContainer>
    )
  }

  if (fetching || !fightResult) {
    return <div></div>
  }

  const { winner, looser, logs } = fightResult
  const colorStyle = { color: fightResult.statusColor }

  return (
    <PageContainer>
      <h1 style={colorStyle}>{fightResult.displayStatus}</h1>
      <CharactersPreview>
        <CharacterPreview
          style={{
            border: fightResult.status === 'draw' ? '' : '1px solid #DCE001',
          }}
          characterProps={Character.fromPrimitives(winner).getProps()}
        />
        <CharacterPreview
          characterProps={Character.fromPrimitives(looser).getProps()}
        />
      </CharactersPreview>
      <p>{fightResult.title}</p>

      <LogList logs={logs} />
      <HomeButton />
    </PageContainer>
  )
}

const CharactersPreview = styled.div({
  ...(flexRowCenterStyle as {}),
  columnGap: '20px',
})
