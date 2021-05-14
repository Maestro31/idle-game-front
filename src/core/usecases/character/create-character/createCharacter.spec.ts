import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import Character from '../../../models/Character'
import { createCharacter } from './createCharacter'

describe('Create character', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  it('should create character with the given informations', async () => {
    const characterPayload = {
      name: 'John',
      skillPoints: 12,
      health: 13,
      attack: 0,
      magic: 0,
      defense: 0,
    }

    await store.dispatch(createCharacter(characterPayload))
    expect(characterGateway.getLastArgs()).toEqual(characterPayload)
  })
})
