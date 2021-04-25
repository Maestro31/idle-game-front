import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import CharacterCreator from '../../../../game/character/CharacterCreator'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { retrieveCharacters } from './retrieveCharacters'

describe('Retrieve characters', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterCreator: CharacterCreator
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    characterCreator = new CharacterCreator()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should not retrieve any characters when no one exists', async () => {
    await store.dispatch(retrieveCharacters)

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        byId: {},
      },
    })
  })

  it('should retrieve all characters', async () => {
    const character1 = {
      id: 'uuid-1',
      properties: characterCreator.createCharacterProps('John'),
    }
    const character2 = {
      id: 'uuid-2',
      properties: characterCreator.createCharacterProps('Alice'),
    }

    characterGateway.feed([character1, character2])

    await store.dispatch(retrieveCharacters)

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        byId: {
          'uuid-1': character1,
          'uuid-2': character2,
        },
      },
    })
  })
})
