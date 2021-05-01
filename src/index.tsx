import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import FakeAuthGateway from './adapters/secondary/auth/FakeAuthGateway'
import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import LocalStorageService from './adapters/secondary/storage/LocalStorageService'
import FakeCharacterGateway from './adapters/secondary/character/FakeCharacterGateway'
import FakeFightGateway from './adapters/secondary/fight/FakeFightGateway'
import ConsoleGameLogger from './game/game-logger/ConsoleGameLogger'
import RealRandom from './game/services/realRandom'

const authGateway = new FakeAuthGateway()
const gameLogger = new ConsoleGameLogger()
const randService = new RealRandom()
const fightGateway = new FakeFightGateway(gameLogger, randService)
const characterGateway = new FakeCharacterGateway()
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
