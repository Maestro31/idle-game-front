import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import LocalStorageService from './adapters/secondary/storage/LocalStorageService'
import RealAuthGateway from './adapters/secondary/auth/RealAuthGateway'
import RealCharacterGateway from './adapters/secondary/character/RealCharacterGateway'
import RealFightGateway from './adapters/secondary/fight/RealFightGateway'

const authGateway = new RealAuthGateway()
const fightGateway = new RealFightGateway()
const characterGateway = new RealCharacterGateway()
const localStorageService = new LocalStorageService()
const store = configureStore({
  authGateway,
  characterGateway,
  fightGateway,
  localStorageService,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
