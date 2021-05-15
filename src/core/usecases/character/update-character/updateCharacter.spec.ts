import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import { Skill } from '../../../adapters/secondary/character/CharacterGatewayInterface'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { incrementSkill } from './incrementSkill'

describe('Update character', () => {
  let store: ReduxStore
  let initialState: AppState
  let characterGateway: InMemoryCharacterGateway

  beforeEach(() => {
    characterGateway = new InMemoryCharacterGateway()
    store = configureStore({ characterGateway })
    initialState = store.getState()
  })

  describe('Increment skill', () => {
    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should add 1 ${skill} point to the character and consume 1 skill point`, async () => {
        const character = new CharacterBuilder()
          .withId('uuid-1')
          .withSkillPoints(1)
          .withHealth(0)
          .withAttack(0)
          .withDefense(0)
          .withMagic(0)
          .build()

        characterGateway.feed([character])

        await store.dispatch(incrementSkill(skill as Skill, character.id))
        expect(characterGateway.getLastArgs()).toEqual({
          skill,
          characterId: character.id,
        })
      })
    }
  })
})
