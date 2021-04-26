import AssaultLog from './AssaultLog'
export default interface GameLoggerInterface {
  logAssault(assaultLog: AssaultLog): void
}
