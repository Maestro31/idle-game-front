import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { AppState } from './appState.interface'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Dependencies } from '../dependencies'
import auth from './reducers/authReducer'
import character from './reducers/characterReducer'
import fightResult from './reducers/fightResultReducer'

export const configureStore = (dependencies: Partial<Dependencies>) =>
  createStore(
    combineReducers({
      auth,
      character,
      fightResult,
    }),
    composeWithDevTools(
      applyMiddleware(
        dependencies
          ? (thunk.withExtraArgument(dependencies) as ThunkMiddleware<
              AppState,
              Action,
              Dependencies
            >)
          : thunk
      )
    )
  )

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, Dependencies, Action>
}

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, Action>
