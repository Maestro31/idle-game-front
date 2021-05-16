import { useDispatch, useSelector } from 'react-redux'
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  NavLink,
} from 'react-router-dom'
import { findCharacterById } from '../../../../redux/selectors/findCharacterById'
import { findBattleResultsByCharacterId } from '../../../../redux/selectors/battleSelectors'
import { PageContainer } from '../../components/sharedComponents'
import CharacterDetails from '../../components/character/CharacterDetails'
import React, { useEffect } from 'react'
import { retrieveCharacter } from '../../../../core/usecases/character/retrieve-character/retrieveCharacter'
import SkillForm from '../../components/character/SkillForm'
import { incrementSkill } from '../../../../core/usecases/character/update-character/incrementSkill'
import { deleteCharacter } from '../../../../core/usecases/character/delete-character/deleteCharacter'
import styled from '@emotion/styled'
import { Skill } from '../../../../core/adapters/secondary/character/CharacterGatewayInterface'
import { retrieveBattleResults } from '../../../../core/usecases/character/retrieve-battle-results/retrieveBattleResults'
import TableView from '../../components/TableView'
import HomeButton from '../../components/HomeButton'
import { flexRowCenterStyle } from '../../components/styles'

export default function CharacterView() {
  const { path, url } = useRouteMatch()
  const { id } = useParams<{ id: string }>()
  const characterProps = useSelector(findCharacterById(id))
  const dispatch = useDispatch()
  const history = useHistory()
  const battleResults = useSelector(findBattleResultsByCharacterId(id))

  useEffect(() => {
    dispatch(retrieveCharacter(id))
    dispatch(retrieveBattleResults(id))
  }, [dispatch, id])

  if (!characterProps) {
    return <div></div>
  }

  const increment = (skill: Skill) => (e: React.MouseEvent) => {
    dispatch(incrementSkill(skill, characterProps.id))
  }

  return (
    <PageContainer>
      <CharacterDetails
        characterProps={characterProps}
        actionButtonProps={{
          title: 'Supprimer',
          color: '#c12f2f',
          onClick: () => {
            dispatch(deleteCharacter(characterProps.id))
            history.push('/')
          },
        }}
      />
      <NavMenu>
        <li>
          <NavMenuLink to={`${url}/history`}>Historique de combat</NavMenuLink>
        </li>
        <li>
          <NavMenuLink strict to={`${url}/up`}>
            Amélioration{' '}
            {characterProps.skillPoints > 0 && (
              <SkillPointsCount>{characterProps.skillPoints}</SkillPointsCount>
            )}
          </NavMenuLink>
        </li>
      </NavMenu>
      <Switch>
        <Route path={`${path}/history`}>
          <TableView>
            {battleResults &&
              battleResults.map((battleResult, index) => (
                <BattleResult
                  key={index}
                  backgroundColor={battleResult.colorStatus}
                >
                  <td>{battleResult.opponent.name}</td>
                  <td>
                    {battleResult.opponent.attack}&nbsp;⚔️{' '}
                    {battleResult.opponent.magic}&nbsp;🪄
                    {battleResult.opponent.defense}&nbsp;🛡️
                    {battleResult.opponent.health}&nbsp;❤️
                  </td>
                  <td>{battleResult.displayStatus}</td>
                </BattleResult>
              ))}
          </TableView>
        </Route>
        <Route exact path={`${path}/up`}>
          <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
            <SkillForm characterProps={characterProps} increment={increment} />
          </div>
        </Route>
      </Switch>
      <HomeButton />
    </PageContainer>
  )
}

const BattleResult = styled.tr(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    '& > td': {
      backgroundColor,
    },
  })
)

const NavMenu = styled.ul({
  ...(flexRowCenterStyle as {}),
  listStyle: 'none',
  margin: 0,
  padding: 0,
  height: '48px',
  width: '100%',
  marginTop: '8px',

  '& > li': {
    flexGrow: 1,
    ...(flexRowCenterStyle as {}),
    height: '100%',
  },
})

const NavMenuLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'white',
  ...(flexRowCenterStyle as {}),
  height: '100%',
  width: '100%',
  borderBottom: '2px solid #5f4130',

  '&.active': {
    borderBottomColor: '#DCE001',
  },
})

const SkillPointsCount = styled.span({
  fontSize: '1.2em',
  fontWeight: 'bold',
  color: '#DCE001',
  marginLeft: '10px',
})
