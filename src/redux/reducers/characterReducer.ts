import { combineReducers } from 'redux'
import { CharacterActionTypes } from '../../core/usecases/character/actionCreators'
import { CharactersById } from '../appState.interface'

const initialState: CharactersById = {}

const characters = (
  state: CharactersById = initialState,
  action: CharacterActionTypes
) => {
  switch (action.type) {
    case 'CHARACTERS_RETRIEVED':
      const charactersById: CharactersById = {}
      action.payload.characters.forEach(
        (character) => (charactersById[character.id] = character.toPrimitives())
      )
      return charactersById
    case 'CHARACTER_RETRIEVED':
      return {
        ...state,
        [action.payload.character.id]: action.payload.character.toPrimitives(),
      }
    case 'CHARACTER_UPDATED':
      const { character } = action.payload
      return {
        ...state,
        [character.id]: character.toPrimitives(),
      }
    case 'CHARACTER_DELETED':
      delete state[action.payload.id]
      return { ...state }
    default:
      return state
  }
}

const errorMessageInitialState: string | null = null

const errorMessage = (
  state: string | null = errorMessageInitialState,
  action: CharacterActionTypes
) => {
  if (action.type === 'CHARACTER_ERROR') {
    return action.payload.errorMessage
  }

  return state
}

export default combineReducers({ byId: characters, errorMessage })
