import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { retrieveBattleResults } from './retrieveBattleResults'

describe('Retrieve character battle history', () => {
  let characterGateway: InMemoryCharacterGateway
  let store: ReduxStore
  let initialState: AppState

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should retrieve empty history of battle', async () => {
    characterGateway.feedBattleResults({ 'uuid-character-1': [] })

    await store.dispatch(retrieveBattleResults('uuid-character-1'))

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        battleHistoriesByCharacterId: {
          'uuid-character-1': [],
        },
      },
    })
  })
})
