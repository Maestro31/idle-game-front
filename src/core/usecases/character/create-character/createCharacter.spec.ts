import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import CharacterCreator from '../../../../game/character/CharacterCreator'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import { createCharacter } from './createCharacter'

describe('Create character', () => {
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

  it('should create character with the given informations', async () => {
    const characterProps = characterCreator.createCharacterProps('John')
    await store.dispatch(createCharacter(characterProps))

    expect(await characterGateway.retrieveCharacters()).toHaveLength(1)
  })
})
