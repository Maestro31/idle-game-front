import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useParams, useRouteMatch } from 'react-router'
import { findCharacterById } from '../../../redux/selectors/findCharacterById'
import { PageContainer } from '../components/sharedComponents'
import CharacterDetails from '../components/character/CharacterDetails'
import React, { useEffect } from 'react'
import { retrieveCharacter } from '../../../core/usecases/character/retrieve-character/retrieveCharacter'
import SkillForm from '../components/character/SkillForm'
import { incrementSkill } from '../../../core/usecases/character/update-character/incrementSkill'
import { Skill } from '../../../services/character.interface'

export default function CharacterView() {
  const { path } = useRouteMatch()
  const { id } = useParams<{ id: string }>()
  const characterProps = useSelector(findCharacterById(id))
  const dispatch = useDispatch()

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
      <CharacterDetails characterProps={characterProps} />
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
    </PageContainer>
  )
}
