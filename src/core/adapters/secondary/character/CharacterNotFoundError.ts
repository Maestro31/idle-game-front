export default class CharacterNotFoundError extends Error {
  constructor() {
    super('Character not found')
  }
}
