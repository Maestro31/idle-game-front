export default class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
  }
}
