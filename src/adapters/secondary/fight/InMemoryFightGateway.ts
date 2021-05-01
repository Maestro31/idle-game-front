import CharacterNotFoundError from '../../../core/adapters/secondary/character/CharacterNotFoundError'
import FightGatewayInterface, {
  FightResult,
} from '../../../core/adapters/secondary/fight/FightGatewayInterface'
import Character from '../../../core/models/Character'
import Arena from '../../../game/arena/Arena'
import { Fighter } from '../../../game/fighter/Fighter'
import AssaultLog from '../../../game/game-logger/AssaultLog'
import GameLoggerInterface from '../../../game/game-logger/GameLoggerInterface'
import GameRunner from '../../../game/game-runner/GameRunner'
import { RandomInterface } from '../../../game/services/RandomInterface'

export default class InMemoryFightGateway implements FightGatewayInterface {
  protected characters: Character[] = []

  constructor(
    private gameLogger: GameLoggerInterface,
    private randomService: RandomInterface
  ) {}

  async runFight(playerId: string): Promise<FightResult> {
    const [player, opponent] = this.makeMatch(playerId)
    const gameRunner = this.prepareGame(player, opponent)
    const winner = gameRunner.run()
    const fightLogs = gameRunner.getLogs()

    const looser = winner.id === playerId ? opponent : player

    this.characters = [
      ...this.characters.map((character) =>
        character.id === winner.id ? winner : character
      ),
    ]

    return Promise.resolve(this.buildFightResult(winner, looser, fightLogs))
  }

  feed(characters: Character[]) {
    this.characters = characters
  }

  private findCharacterById(id: string) {
    return this.characters.find((character) => character.id === id)
  }

  protected findOpponent(playerId: string) {
    return this.characters.find((character) => character.id !== playerId)
  }

  private makeMatch(playerId: string): [Character, Character] {
    const player = this.findCharacterById(playerId)
    const opponent = this.findOpponent(playerId)

    if (!opponent || !player) {
      throw CharacterNotFoundError
    }

    return [player, opponent]
  }

  private prepareGame(player: Character, opponent: Character): GameRunner {
    const arena = new Arena(
      new Fighter(player.id, player.getProps()),
      new Fighter(opponent.id, opponent.getProps()),
      this.randomService
    )

    return new GameRunner(arena, this.gameLogger)
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
    }
  }
}
