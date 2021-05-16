export default class NoOpponentFoundException extends Error {
  constructor() {
    super('Unable to find an opponent for your fighter')
  }
}
