import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import CharacterCreator from '../../../../game/character/CharacterCreator'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import Character from '../../../models/Character'
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
    const character = Character.fromPrimitives({
      id: 'uuid-1',
      ...characterCreator.createCharacterProps('John'),
    })
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
      const character = Character.fromPrimitives({
        id: `uuid-${i}`,
        ...characterCreator.createCharacterProps(`John ${i}`),
      })
      characters.push(character)
    }

    characterGateway.feed(characters)

    const additionnalCharacter = Character.fromPrimitives({
      id: `uuid-10`,
      ...characterCreator.createCharacterProps(`John 10`),
    })

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
