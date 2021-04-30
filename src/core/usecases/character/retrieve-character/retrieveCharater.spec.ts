import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { retrieveCharacter } from './retrieveCharacter'

describe('Retrieve characters', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should retrieve the character with the given id', async () => {
    const character1 = new CharacterBuilder().withId('uuid-1').build()

    characterGateway.feed([character1])

    await store.dispatch(retrieveCharacter('uuid-1'))

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        byId: {
          'uuid-1': character1.toPrimitives(),
        },
      },
    })
  })
})
