import Arena from '../arena/Arena'
import CharacterCreator from '../character/CharacterCreator'
import FighterStub from '../fighter/FighterStub'
import InMemoryGameLogger from '../game-logger/InMemoryGameLogger'
import RandomStub from '../services/RandomStub'
import GameRunner from './GameRunner'

describe('Game Runner', () => {
  let gameRunner: GameRunner
  let arena: Arena
  let player: FighterStub
  let opponent: FighterStub
  let randomService: RandomStub
  let gameLogger: InMemoryGameLogger

  beforeEach(() => {
    const characterCreator = new CharacterCreator()

    player = new FighterStub(characterCreator.createCharacter('John Snow'))
    opponent = new FighterStub(characterCreator.createCharacter('Daenerys'))

    randomService = new RandomStub()
    gameLogger = new InMemoryGameLogger()
    arena = new Arena(player, opponent, randomService)
    gameRunner = new GameRunner(arena, gameLogger)
  })

  it('should run the game and retrieve the winner', () => {
    randomService.willRespond(2)

    player.overrideCharacterWith({ attack: 2 })
    opponent.overrideCharacterWith({ health: 2, defense: 1 })

    gameRunner.run()
    expect(gameRunner.getWinner()).toBe(player)
  })

  it('should log all turn results', () => {
    randomService.willRespond(1)

    player.overrideCharacterWith({ attack: 1, health: 5, defense: 1 })
    opponent.overrideCharacterWith({ health: 2, defense: 0, attack: 2 })

    gameRunner.run()
    expect(gameLogger.getLogs()).toEqual([
      {
        assailant: player.getCharacter(),
        assailed: opponent.getCharacter(),
        assaultResult: {
          attack: 1,
          damageTaken: 1,
        },
      },
      {
        assailant: opponent.getCharacter(),
        assailed: player.getCharacter(),
        assaultResult: {
          attack: 1,
          damageTaken: 0,
        },
      },
      {
        assailant: player.getCharacter(),
        assailed: opponent.getCharacter(),
        assaultResult: {
          attack: 1,
          damageTaken: 1,
        },
      },
    ])
  })
})
