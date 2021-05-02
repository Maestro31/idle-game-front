import Arena, { IllegalFightError } from './Arena'
import CharacterCreator from '../character/CharacterCreator'
import RandomStub from '../services/RandomStub'
import FighterStub from '../fighter/FighterStub'
import AssaultLog from '../game-logger/AssaultLog'
import { CharacterProps } from '../character/character.interface'

describe('Arena', () => {
  let arena: Arena
  let player: FighterStub
  let opponent: FighterStub
  let randomService: RandomStub

  beforeEach(() => {
    const characterCreator = new CharacterCreator()

    player = new FighterStub(
      'uuid-1',
      characterCreator.createCharacterProps('David')
    )
    opponent = new FighterStub(
      'uuid-2',
      characterCreator.createCharacterProps('Goliath')
    )

    randomService = new RandomStub()
    arena = new Arena(player, opponent, randomService)
  })

  describe('Turn system', () => {
    it('should give the first turn to the player', () => {
      expect(arena.getAssailantFighter()).toBe(player)
    })

    it('should give the second turn to the opponent', () => {
      arena.nextTurn()
      expect(arena.getAssailantFighter()).toBe(opponent)
    })

    it('should give the third turn to the player', () => {
      arena.nextTurn()
      arena.nextTurn()
      expect(arena.getAssailantFighter()).toBe(player)
    })
  })

  describe('Fight mechanic', () => {
    it('should permit the player to attack his opponent with the given random attack', () => {
      randomService.willRespond(3)

      arena.startAssault()

      expect(player.getRemainingHealth()).toBe(10)
      expect(opponent.getRemainingHealth()).toBe(7)
    })

    it('should permit opponent to attack the player with the given random attack', () => {
      randomService.willRespond(4)

      arena.nextTurn()
      arena.startAssault()

      expect(opponent.getRemainingHealth()).toBe(10)
      expect(player.getRemainingHealth()).toBe(6)
    })

    it('should not permit opponent to take damages when his defense skill is greater than damage value', () => {
      randomService.willRespond(1)

      player.overrideCharacterWith({ attack: 5 })
      opponent.overrideCharacterWith({ health: 9, defense: 1 })

      arena.startAssault()

      expect(opponent.getRemainingHealth()).toBe(9)
    })

    it(`should inflict additional magic damage if the opponent has taken as
        'much damage as the magic skill value that the player`, () => {
      randomService.willRespond(2)

      player.overrideCharacterWith({ attack: 5, magic: 1 })
      opponent.overrideCharacterWith({ defense: 1 })

      arena.startAssault()

      expect(opponent.getRemainingHealth()).toBe(8)
    })
  })

  describe('Declare winner', () => {
    it('should declare the player as the winner if his opponent is dead', () => {
      randomService.willRespond(2)

      player.overrideCharacterWith({ name: 'John Snow', attack: 5 })
      opponent.overrideCharacterWith({
        name: 'Daenerys',
        health: 1,
        defense: 1,
      })

      let winnerId = null
      arena.onFightEnded(
        (declaredWinnerId: string, winnerProps: CharacterProps) =>
          (winnerId = declaredWinnerId)
      )

      arena.startAssault()

      expect(opponent.getRemainingHealth()).toBe(0)
      expect(winnerId).toBe('uuid-1')
    })

    it('should declare the opponent as the winner if the player is dead', () => {
      randomService.willRespond(2)

      player.overrideCharacterWith({ name: 'John', health: 1, defense: 1 })
      opponent.overrideCharacterWith({ name: 'Daenerys', attack: 5 })

      let winnerId = null
      arena.onFightEnded(
        (declaredWinnerId: string, winnerProps: CharacterProps) =>
          (winnerId = declaredWinnerId)
      )

      arena.nextTurn()
      arena.startAssault()

      expect(player.getRemainingHealth()).toBe(0)
      expect(winnerId).toBe('uuid-2')
    })

    it('should not permit a fight if a fighter is dead', () => {
      randomService.willRespond(2)

      player.overrideCharacterWith({ attack: 5 })
      opponent.overrideCharacterWith({ health: 2 })

      arena.startAssault()

      expect(() => arena.startAssault()).toThrow(IllegalFightError)
    })

    it('should notify when the winner is declared', () => {
      let winnerProps = null
      let winnerId = null
      arena.onFightEnded(
        (declaredWinnerId: string, declaredWinnerProps: CharacterProps) => {
          winnerId = declaredWinnerId
          winnerProps = declaredWinnerProps
        }
      )

      randomService.willRespond(2)

      player.overrideCharacterWith({ attack: 5 })
      opponent.overrideCharacterWith({ health: 2 })

      arena.startAssault()
      expect(winnerProps).toBeDefined()
      expect(winnerId).toBe('uuid-1')
    })

    it('should increment rank and skill points by 1 for the winner', () => {
      let rank = 0
      arena.onFightEnded((winnerId: string, winnerProps: CharacterProps) => {
        rank = winnerProps.rank
      })

      randomService.willRespond(2)

      player.overrideCharacterWith({ attack: 5 })
      opponent.overrideCharacterWith({ health: 2 })

      arena.startAssault()

      expect(rank).toEqual(1)
    })
  })

  describe('Log system', () => {
    it('should notify when a log assault is created', () => {
      let assaultLog = null

      arena.onAssaultLogCreated((receivedAssaultLog: AssaultLog) => {
        assaultLog = receivedAssaultLog
      })

      randomService.willRespond(2)

      player.overrideCharacterWith({ attack: 5 })
      opponent.overrideCharacterWith({ health: 2 })

      arena.startAssault()

      expect(assaultLog).toEqual({
        turn: 1,
        assailant: player.getCharacterProps(),
        assailed: {
          ...opponent.getCharacterProps(),
          health: 0,
        },
        assaultResult: {
          attack: 2,
          damageTaken: 2,
        },
      })
    })
  })
})
