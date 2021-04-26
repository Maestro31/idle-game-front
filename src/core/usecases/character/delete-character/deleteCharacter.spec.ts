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
    const character = new CharacterBuilder().withId('uuid-1').build()

    characterGateway.createCharacter(character)
    store.dispatch(CharacterActions.characterCreated(character))

    await store.dispatch(deleteCharacter(character.id))

    const characters = await characterGateway.retrieveCharacters()

    expect(characters).toHaveLength(0)
    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        byId: {},
      },
    })
  })
})
