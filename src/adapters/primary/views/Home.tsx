import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { findUser } from '../../../redux/selectors/findUser'
import Characters from './Characters'
import { Switch, Route } from 'react-router-dom'
import CreateCharacter from './character/CreateCharacter'
import CharacterView from './character/CharacterView'
import BattleView from './BattleView'
import { SecondaryButton } from '../components/sharedComponents'
import logoutIcon from '../assets/icons/logout.svg'
import styled from '@emotion/styled'
import { logoutUser } from '../../../core/usecases/auth/logout-user/logoutUser'

export default function Home() {
  const user = useSelector(findUser)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      history.replace('/login')
    }
  }, [user, history])

  return (
    <div
      data-testid="home-view"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ButtonContainer>
        <LogoutButton onClick={() => dispatch(logoutUser)}>
          <img src={logoutIcon} height={24} width={24} alt="déconnexion" />
        </LogoutButton>
      </ButtonContainer>
      <Switch>
        <Route path="/create-character" component={CreateCharacter} />
        <Route exact path="/" component={Characters} />
        <Route path="/characters/:id" component={CharacterView} />
        <Route path="/battle/:id" component={BattleView} />
      </Switch>
    </div>
  )
}

const LogoutButton = styled(SecondaryButton)({
  borderRadius: '50%',
  width: '50px',
  height: '50px',
})

const ButtonContainer = styled.div({
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'flex-end',
})
