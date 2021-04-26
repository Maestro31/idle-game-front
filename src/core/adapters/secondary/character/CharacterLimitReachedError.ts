export default class CharacterLimitReachedError extends Error {
  constructor() {
    super('Unable to add an additional character')
  }
}
