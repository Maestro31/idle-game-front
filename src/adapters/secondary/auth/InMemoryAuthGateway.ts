import AuthGatewayInterface, {
  LoginResponse,
} from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'
import { User } from '../../../redux/appState.interface'
import InvalidCredentialsError from '../../../core/adapters/secondary/auth/InvalidCredentialsError'
import InvalidTokenError from '../../../core/adapters/secondary/auth/InvalidToken'

export default class InMemoryAuthGateway implements AuthGatewayInterface {
  protected users: { [key: string]: User } = {}

  protected usersLogged: { [key: string]: User } = {}

  async login(email: string, _: string): Promise<LoginResponse> {
    const user = Object.values(this.users).find((user) => user.email === email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const authToken = `${user.firstname.toLowerCase()}-${user.lastname.toLowerCase()}`
    this.usersLogged[authToken] = user

    return Promise.resolve({
      user,
      authToken,
    })
  }

  async register(userId: string, userProps: UserProps): Promise<void> {
    const { email, firstname, lastname } = userProps
    this.users[userId] = { id: userId, email, firstname, lastname }
    return Promise.resolve()
  }

  async refreshUser(authToken: string): Promise<LoginResponse> {
    const [firstname, lastname] = authToken.split('-')

    const user = Object.values(this.users).find(
      (user) =>
        user.firstname.toLowerCase() === firstname &&
        user.lastname.toLowerCase() === lastname
    )

    if (!user) {
      throw new InvalidTokenError()
    }

    return Promise.resolve({ user, authToken })
  }

  async logoutUser(authToken: string): Promise<void> {
    delete this.usersLogged[authToken]
    return Promise.resolve()
  }

  getUser(userId: string) {
    return this.users[userId]
  }

  getUsersLogged() {
    return this.usersLogged
  }
}
