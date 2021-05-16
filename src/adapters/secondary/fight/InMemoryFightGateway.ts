import FightGatewayInterface, {
  AssaultLog,
  FightResult,
} from '../../../core/adapters/secondary/fight/FightGatewayInterface'
import Character from '../../../core/models/Character'

export default class InMemoryFightGateway implements FightGatewayInterface {
  private character!: Character
  private opponent!: Character
  private logs: AssaultLog[] = []
  private nextError: Error | null = null

  async runFight(characterID: string): Promise<FightResult> {
    if (this.nextError) {
      throw this.nextError
    }

    return this.buildFightResult(this.character, this.opponent, this.logs)
  }

  feed(character: Character) {
    this.character = character
  }

  feedLogs(logs: AssaultLog[]) {
    this.logs = logs
  }

  feedOpponent(character: Character) {
    this.opponent = character
  }

  willThrow(error: Error) {
    this.nextError = error
  }

  private buildFightResult(
    winner: Character,
    looser: Character,
    logs: AssaultLog[]
  ): FightResult {
    return {
      winner: {
        id: winner.id,
        ...winner.getProps(),
      },
      looser: {
        id: looser.id,
        ...looser.getProps(),
      },
      logs,
      draw: false,
    }
  }
}
