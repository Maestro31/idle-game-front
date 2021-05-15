import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { findUser } from '../../../redux/selectors/findUser'
import Characters from './Characters'
import { Switch, Route } from 'react-router-dom'
import CreateCharacter from './CreateCharacter'
import CharacterView from './CharacterView'
import BattleView from './BattleView'

export default function Home() {
  const user = useSelector(findUser)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.replace('/login')
    }
  }, [user, history])

  return (
    <div data-testid="home-view" style={{ height: '100%' }}>
      <Switch>
        <Route path="/create-character" component={CreateCharacter} />
        <Route exact path="/" component={Characters} />
        <Route path="/characters/:id" component={CharacterView} />
        <Route path="/battle/:id" component={BattleView} />
      </Switch>
    </div>
  )
}
