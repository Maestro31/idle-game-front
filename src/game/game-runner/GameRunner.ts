import Arena from '../arena/Arena'
import { Fighter } from '../fighter/Fighter'
import {
  AssaultLog,
  GameLoggerInterface,
} from '../game-logger/GameLoggerInterface'

export default class GameRunner {
  private winner: Fighter | null = null

  constructor(private arena: Arena, private gameLogger: GameLoggerInterface) {
    arena.onFightEnded((winner) => {
      this.winner = winner
    })

    arena.onAssaultLogCreated((assaultLog: AssaultLog) => {
      this.gameLogger.logAssault(assaultLog)
    })
  }

  run() {
    while (!this.winner) {
      this.arena.startAssault()
      this.arena.nextTurn()
    }
  }

  getWinner() {
    return this.winner
  }
}
