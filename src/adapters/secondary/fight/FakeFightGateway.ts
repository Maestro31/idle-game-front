import { FightResult } from '../../../core/adapters/secondary/fight/FightGatewayInterface'
import CharacterBuilder from '../../../core/builders/CharacterBuilder'
import Character, { CharacterDTO } from '../../../core/models/Character'
import GameLoggerInterface from '../../../game/game-logger/GameLoggerInterface'
import { RandomInterface } from '../../../game/services/RandomInterface'
import InMemoryFightGateway from './InMemoryFightGateway'

export default class FakeFightGateway extends InMemoryFightGateway {
  private opponents: Character[] = [
    new CharacterBuilder()
      .withId('opponent1')
      .withProps({ rank: 0, attack: 5, defense: 2, magic: 2 })
      .build(),
    new CharacterBuilder()
      .withId('opponent2')
      .withProps({ rank: 0, attack: 3, defense: 2, magic: 2 })
      .build(),
    new CharacterBuilder()
      .withId('opponent3')
      .withProps({ rank: 1, attack: 5, defense: 2, magic: 2 })
      .build(),
    new CharacterBuilder()
      .withId('opponent4')
      .withProps({ rank: 1, attack: 5, defense: 2, magic: 2 })
      .build(),
    new CharacterBuilder()
      .withId('opponent5')
      .withProps({ rank: 10, attack: 16, defense: 20, magic: 10 })
      .build(),
    new CharacterBuilder()
      .withId('opponent6')
      .withProps({ rank: 5, attack: 8, defense: 5, magic: 3 })
      .build(),
  ]

  constructor(gameLogger: GameLoggerInterface, randomService: RandomInterface) {
    super(gameLogger, randomService)
    this.loadCharacters()
  }

  async runFight(playerId: string): Promise<FightResult> {
    this.loadCharacters()
    const fightResult = await super.runFight(playerId)
    this.saveCharacters()
    return fightResult
  }

  protected findOpponent(playerId: string) {
    return this.opponents[Math.floor(Math.random() * this.opponents.length)]
  }

  private loadCharacters() {
    const json = localStorage.getItem('characters')
    if (!json) return

    const rawCharacters = JSON.parse(json)
    this.characters = rawCharacters.map((rawCharacter: CharacterDTO) =>
      Character.fromPrimitives(rawCharacter)
    )
  }

  private saveCharacters() {
    const rawCharacters = this.characters.map((character) =>
      character.toPrimitives()
    )
    localStorage.setItem('characters', JSON.stringify(rawCharacters))
  }
}
