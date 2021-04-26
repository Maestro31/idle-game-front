import InMemoryCharacterGateway from '../../../../adapters/secondary/character/InMemoryCharacterGateway'
import { Skill } from '../../../../game/character/character.interface'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
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

        expect(store.getState()).toEqual({
          ...initialState,
          character: {
            ...initialState.character,
            byId: {
              [character.id]: {
                ...character.toPrimitives(),
                [skill]: 1,
                skillPoints: 0,
              },
            },
          },
        })
      })
    }

    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should not increment ${skill} when they are no more skill points`, async () => {
        const character = new CharacterBuilder()
          .withId('uuid-1')
          .withSkillPoints(0)
          .build()

        characterGateway.feed([character])

        await store.dispatch(incrementSkill(skill as Skill, character.id))

        expect(store.getState()).toEqual({
          ...initialState,
          character: {
            ...initialState.character,
            byId: {},
            errorMessage: 'Insufficient skill points amount',
          },
        })
      })
    }

    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should fail to add ${skill} point when no one character exists with the given id`, async () => {
        const character = new CharacterBuilder()
          .withId('uuid-1')
          .withSkillPoints(0)
          .build()

        characterGateway.feed([])

        await store.dispatch(incrementSkill(skill as Skill, character.id))

        expect(store.getState()).toEqual({
          ...initialState,
          character: {
            ...initialState.character,
            byId: {},
            errorMessage: 'Character not found',
          },
        })
      })
    }
  })
})
