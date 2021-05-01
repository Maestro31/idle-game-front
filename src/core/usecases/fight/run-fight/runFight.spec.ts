import InMemoryFightGateway from '../../../../adapters/secondary/fight/InMemoryFightGateway'
import InMemoryGameLogger from '../../../../game/game-logger/InMemoryGameLogger'
import RandomStub from '../../../../game/services/RandomStub'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { runFight } from './runFight'

describe('Run fight', () => {
  let store: ReduxStore
  let initialState: AppState
  let fightGateway: InMemoryFightGateway
  let randomService: RandomStub
  let gameLogger: InMemoryGameLogger

  beforeEach(() => {
    randomService = new RandomStub()
    gameLogger = new InMemoryGameLogger()
    fightGateway = new InMemoryFightGateway(gameLogger, randomService)
    store = configureStore({ fightGateway })
    initialState = store.getState()
  })

  it('should run a match with the given character and store the result', async () => {
    const player = new CharacterBuilder()
      .withId('uuid-1')
      .withProps({
        name: 'John',
        skillPoints: 0,
        health: 15,
        attack: 5,
        defense: 2,
      })
      .build()

    const opponent = new CharacterBuilder()
      .withId('uuid-2')
      .withProps({ name: 'Daenerys', skillPoints: 0, health: 5, defense: 0 })
      .build()

    randomService.willRespond(5)

    fightGateway.feed([player, opponent])

    await store.dispatch(runFight('uuid-1'))

    expect(store.getState()).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        byId: {
          ...initialState.character.byId,
          'uuid-1': {
            id: 'uuid-1',
            ...player.getProps(),
            skillPoints: 1,
            rank: 1,
          },
        },
      },
      fightResult: {
        winner: {
          id: 'uuid-1',
          ...player.getProps(),
          skillPoints: 1,
          rank: 1,
        },
        looser: {
          id: 'uuid-2',
          ...opponent.getProps(),
        },
        logs: [
          {
            turn: 1,
            assailant: player.getProps(),
            assailed: opponent.getProps(),
            assaultResult: {
              attack: 5,
              damageTaken: 5,
            },
          },
        ],
      },
    })
  })
})
