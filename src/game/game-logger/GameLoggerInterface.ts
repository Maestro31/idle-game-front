import { CharacterProps } from '../character/character.interface'

export interface AssaultLog {
  assailant: CharacterProps
  assailed: CharacterProps
  assaultResult: {
    attack: number
    damageTaken: number
  }
}

export interface GameLoggerInterface {
  logAssault(assaultLog: AssaultLog): void
}
