import { CharacterProps } from '../character/character.interface'

export default interface AssaultLog {
  turn: number
  assailant: CharacterProps
  assailed: CharacterProps
  assaultResult: {
    attack: number
    damageTaken: number
  }
}
