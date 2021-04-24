import { Fighter } from '../fighter/Fighter'
import { AssaultLog } from '../game-logger/GameLoggerInterface'
import { RandomInterface } from '../services/RandomInterface'

export class IllegalFightError extends Error {
  constructor() {
    super('Unable to fight when a fighter is dead')
  }
}

export default class Arena {
  private winner: Fighter | null = null
  private onFightEndedCallback: ((winner: Fighter) => void) | null = null
  private onAssaultLogCreatedCallback:
    | ((assaultLog: AssaultLog) => void)
    | null = null

  constructor(
    private assailantFighter: Fighter,
    private assailedFighter: Fighter,
    private randomService: RandomInterface
  ) {}

  getAssailantFighter(): Fighter {
    return this.assailantFighter
  }

  getAssailedFighter(): Fighter {
    return this.assailedFighter
  }

  nextTurn(): void {
    const assailantFighter = this.assailantFighter
    this.assailantFighter = this.assailedFighter
    this.assailedFighter = assailantFighter
  }

  startAssault(): void {
    if (this.winner) {
      throw new IllegalFightError()
    }

    const assailantAttack = this.assailantFighter.getAttack()
    const attackToInflict = this.randomService.getValueUntil(assailantAttack)

    const currentAssailedHealth = this.assailedFighter.getRemainingHealth()

    this.assailantFighter.attemptToInflictDamage(
      attackToInflict,
      this.assailedFighter
    )

    const assailedRemainingHealth = this.assailedFighter.getRemainingHealth()

    this.logAssault({
      assailant: this.assailantFighter.getCharacter(),
      assailed: this.assailedFighter.getCharacter(),
      assaultResult: {
        attack: attackToInflict,
        damageTaken: currentAssailedHealth - assailedRemainingHealth,
      },
    })

    if (this.isAssailedFighterDead()) {
      this.winner = this.assailantFighter
      this.onFightEndedCallback && this.onFightEndedCallback(this.winner)
    }
  }

  getWinner() {
    return this.winner
  }

  onFightEnded(onFightEndedCallback: (winner: Fighter) => void) {
    this.onFightEndedCallback = onFightEndedCallback
  }

  onAssaultLogCreated(
    onAssaultLogCreatedCallback: (assaultLog: AssaultLog) => void
  ) {
    this.onAssaultLogCreatedCallback = onAssaultLogCreatedCallback
  }

  private isAssailedFighterDead(): boolean {
    return this.assailedFighter.getRemainingHealth() <= 0
  }

  private logAssault(assaultLog: AssaultLog): void {
    this.onAssaultLogCreatedCallback &&
      this.onAssaultLogCreatedCallback(assaultLog)
  }
}
