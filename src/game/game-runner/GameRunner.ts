import Character from '../../core/models/Character'
import Arena from '../arena/Arena'
import { CharacterProps } from '../character/character.interface'
import AssaultLog from '../game-logger/AssaultLog'
import GameLoggerInterface from '../game-logger/GameLoggerInterface'

export default class GameRunner {
  private winnerId: string | null = null
  private winnerProps: CharacterProps | null = null
  private gameLogs: AssaultLog[] = []

  constructor(private arena: Arena, private gameLogger: GameLoggerInterface) {
    arena.onFightEnded((winnerId: string, winnerProps: CharacterProps) => {
      this.winnerId = winnerId
      this.winnerProps = winnerProps
    })

    arena.onAssaultLogCreated((assaultLog: AssaultLog) => {
      this.gameLogs.push(assaultLog)
      this.gameLogger.logAssault(assaultLog)
    })
  }

  run() {
    while (!this.winnerProps || !this.winnerId) {
      this.arena.startAssault()
      this.arena.nextTurn()
    }

    return new Character(this.winnerId, this.winnerProps)
  }

  getWinnerProps() {
    return this.winnerProps
  }

  getWinnerId() {
    return this.winnerId
  }

  getLogs() {
    return this.gameLogs
  }
}
