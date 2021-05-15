import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { CharacterActions } from '../actionCreators'
import { deleteCharacter } from './deleteCharacter'

describe('Delete character', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should delete the character with the given id', async () => {
    await store.dispatch(deleteCharacter('uuid-character-1'))
    expect(characterGateway.getLastArgs()).toBe('uuid-character-1')
  })
})
