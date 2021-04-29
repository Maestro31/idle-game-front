import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refreshUser } from './core/usecases/auth/refresh-user/refreshUser'
import { Switch, Route, useHistory } from 'react-router-dom'
import Login from './adapters/primary/views/Login'
import Home from './adapters/primary/views/Home'
import Register from './adapters/primary/views/Register'
import { findAuthenticationStatus } from './redux/selectors/findAuthenticationStatus'

function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector(findAuthenticationStatus)
  const history = useHistory()

  useEffect(() => {
    dispatch(refreshUser)
  }, [dispatch])

  const loading = authStatus === 'idle' || authStatus === 'fetching'

  return (
    <React.Fragment>
      {!loading && (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      )}
    </React.Fragment>
  )
}

export default App
