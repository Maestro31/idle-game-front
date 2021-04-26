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
    const character = new CharacterBuilder().withId('uuid-1').build()

    await store.dispatch(createCharacter(character))

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        byId: {
          ...initialState.character.byId,
          [character.id]: character.toPrimitives(),
        },
        errorMessage: null,
      },
    })
  })

  it('should not permit to create an eleventh character', async () => {
    let characters: Character[] = []

    for (let i = 0; i < 9; i++) {
      characters.push(new CharacterBuilder().withId(`uuid-${i}`).build())
    }

    characterGateway.feed(characters)

    const additionnalCharacter = new CharacterBuilder()
      .withId('uuid-10')
      .build()

    await store.dispatch(createCharacter(additionnalCharacter))

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        errorMessage: 'Unable to add an additional character',
      },
    })
  })
})
