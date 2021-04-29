import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logoutUser } from "../../../core/usecases/auth/logout-user/logoutUser"
import { findUser } from "../../../redux/selectors/findUser"
import Characters from "./Characters"
import { Switch, Route } from 'react-router-dom'
import CreateCharacter from "./CreateCharacter"

export default function Home() {
  const user = useSelector(findUser)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user)  {
      history.replace('/login')
    }
  }, [user, history])

  return (
    <div data-testid="home-view">
      <button onClick={() => dispatch(logoutUser)}>Se déconnecter</button>
      <Switch>
        <Route exact path="/" component={Characters} />
        <Route path="/create-character" component={CreateCharacter}/>
      </Switch>
    </div>
  )
}