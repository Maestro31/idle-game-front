import { combineReducers } from 'redux'
import { CharacterActions } from '../../core/usecases/character/actionCreators'
import { CharactersById } from '../appState.interface'

const initialState: CharactersById = {}

const characters = (
  state: CharactersById = initialState,
  action: CharacterActions
) => {
  switch (action.type) {
    case 'CHARACTERS_RETRIEVED':
      const charactersById: CharactersById = {}
      action.payload.characters.forEach(
        (character) => (charactersById[character.id] = character.toPrimitives())
      )
      return charactersById
    case 'CHARACTER_CREATED':
      const { character } = action.payload
      return {
        ...state,
        [character.id]: character.toPrimitives(),
      }
    default:
      return state
  }
}

const errorMessageInitialState: string | null = null

const errorMessage = (
  state: string | null = errorMessageInitialState,
  action: CharacterActions
) => {
  if (action.type === 'CHARACTER_ERROR') {
    return action.payload.errorMessage
  }

  return state
}

export default combineReducers({ byId: characters, errorMessage })