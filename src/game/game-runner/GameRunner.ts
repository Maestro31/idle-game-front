import Arena from '../arena/Arena'
import { CharacterProps } from '../character/character.interface'
import AssaultLog from '../game-logger/AssaultLog'
import GameLoggerInterface from '../game-logger/GameLoggerInterface'

export default class GameRunner {
  private winnerProps: CharacterProps | null = null

  constructor(private arena: Arena, private gameLogger: GameLoggerInterface) {
    arena.onFightEnded((winnerProps: CharacterProps) => {
      this.winnerProps = winnerProps
    })

    arena.onAssaultLogCreated((assaultLog: AssaultLog) => {
      this.gameLogger.logAssault(assaultLog)
    })
  }

  run() {
    while (!this.winnerProps) {
      this.arena.startAssault()
      this.arena.nextTurn()
    }
  }

  getWinner() {
    return this.winnerProps
  }
}
