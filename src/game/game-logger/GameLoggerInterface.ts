import { Character } from '../character/character.interface'

export interface AssaultLog {
  assailant: Character
  assailed: Character
  assaultResult: {
    attack: number
    damageTaken: number
  }
}

export interface GameLoggerInterface {
  logAssault(assaultLog: AssaultLog): void
}
