import { useDispatch, useSelector } from 'react-redux'
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router'
import { findCharacterById } from '../../../redux/selectors/findCharacterById'
import { PageContainer, SecondaryButton } from '../components/sharedComponents'
import CharacterDetails from '../components/character/CharacterDetails'
import React, { useEffect } from 'react'
import { retrieveCharacter } from '../../../core/usecases/character/retrieve-character/retrieveCharacter'
import SkillForm from '../components/character/SkillForm'
import { incrementSkill } from '../../../core/usecases/character/update-character/incrementSkill'
import { deleteCharacter } from '../../../core/usecases/character/delete-character/deleteCharacter'
import styled from '@emotion/styled'
import { Skill } from '../../../core/adapters/secondary/character/CharacterGatewayInterface'

export default function CharacterView() {
  const { path } = useRouteMatch()
  const { id } = useParams<{ id: string }>()
  const characterProps = useSelector(findCharacterById(id))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!characterProps) {
      dispatch(retrieveCharacter(id))
    }
  }, [dispatch, characterProps, id])

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
      <Switch>
        <Route exact path={path}>
          <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
            <SkillForm characterProps={characterProps} increment={increment} />
          </div>
        </Route>
        <Route path={`${path}/details`}>
          <p>Test</p>
        </Route>
      </Switch>
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
