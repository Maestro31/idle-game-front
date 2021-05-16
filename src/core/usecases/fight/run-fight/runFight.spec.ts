import InMemoryFightGateway from '../../../../adapters/secondary/fight/InMemoryFightGateway'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import NoOpponentFoundException from '../../../adapters/secondary/fight/NoOpponentFoundException'
import CharacterBuilder from '../../../builders/CharacterBuilder'
import { runFight } from './runFight'

describe('Run fight', () => {
  let store: ReduxStore
  let initialState: AppState
  let fightGateway: InMemoryFightGateway

  beforeEach(() => {
    fightGateway = new InMemoryFightGateway()
    store = configureStore({ fightGateway })
    initialState = store.getState()
  })

  it('should run a match with the given character and store the result', async () => {
    const { player, opponent, logs } = prepareBattle()

    await store.dispatch(runFight('uuid-1'))

    expect(store.getState()).toEqual({
      ...initialState,
      fightResult: {
        ...initialState.fightResult,
        data: {
          winner: {
            id: 'uuid-1',
            ...player.getProps(),
          },
          looser: {
            id: 'uuid-2',
            ...opponent.getProps(),
          },
          logs,
          draw: false,
        },
        fetching: false,
      },
    })
  })

  it('should return an error message when no one opponnent found', async () => {
    prepareBattle()
    fightGateway.willThrow(new NoOpponentFoundException())

    await store.dispatch(runFight('uuid-1'))
    expect(store.getState()).toEqual({
      ...initialState,
      fightResult: {
        data: null,
        errorMessage: 'Unable to find an opponent for your fighter',
        fetching: false,
      },
    })
  })

  function prepareBattle() {
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

    const logs = [
      {
        turn: 1,
        assailant: player.toPrimitives(),
        assailed: {
          ...opponent.toPrimitives(),
          health: 0,
        },
        assaultResult: {
          attack: 5,
          damageTaken: 5,
        },
      },
    ]

    fightGateway.feed(player)
    fightGateway.feedOpponent(opponent)
    fightGateway.feedLogs(logs)

    return { player, opponent, logs }
  }
})
