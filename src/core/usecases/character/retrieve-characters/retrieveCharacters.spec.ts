import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { retrieveCharacters } from './retrieveCharacters'

describe('Retrieve characters', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should not retrieve any characters when no one exists', async () => {
    await store.dispatch(retrieveCharacters)

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        byId: {},
      },
    })
  })

  it('should retrieve all characters', async () => {
    const character1 = new CharacterBuilder().withId('uuid-1').build()
    const character2 = new CharacterBuilder().withId('uuid-2').build()

    characterGateway.feed([character1, character2])

    await store.dispatch(retrieveCharacters)

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        byId: {
          'uuid-1': character1.toPrimitives(),
          'uuid-2': character2.toPrimitives(),
        },
      },
    })
  })
})
