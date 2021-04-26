import AssaultLog from './AssaultLog'
import GameLoggerInterface from './GameLoggerInterface'

export default class ConsoleGameLogger implements GameLoggerInterface {
  logAssault(assaultLog: AssaultLog): void {
    const { assailant, assailed, assaultResult } = assaultLog
    console.log(`
      assailant: ${assailant.name} with ${assailant.attack} attack and ${assailant.magic} magic
      assailed: ${assailed.name} with ${assailed.defense} defense
    `)
    console.log(`
      ${assailant.name} attempt to inflict ${assaultResult.attack}
      and ${assailed.name} taken ${assaultResult.damageTaken} damage
    `)
  }
}
