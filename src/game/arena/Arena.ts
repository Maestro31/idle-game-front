import { Fighter } from '../fighter/Fighter'
import { RandomInterface } from '../services/random.interface'

export class IllegalFightError extends Error {
  constructor() {
    super('Unable to fight when a fighter is dead')
  }
}

export default class Arena {
  private winner: Fighter | null = null
  private onFightEndedCallback: ((winner: Fighter) => void) | null = null

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

    this.assailantFighter.attemptToInflictDamage(
      attackToInflict,
      this.assailedFighter
    )

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

  private isAssailedFighterDead(): boolean {
    return this.assailedFighter.getRemainingHealth() <= 0
  }
}
