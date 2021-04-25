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
        (character) => (charactersById[character.id] = character)
      )
      return charactersById
    default:
      return state
  }
}

export default combineReducers({ byId: characters })
