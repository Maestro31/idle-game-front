import AuthGatewayInterface, {
  LoginResponse,
} from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'
import { User } from '../../../redux/appState.interface'
import InvalidCredentialsError from '../../../core/adapters/secondary/auth/InvalidCredentialsError'

export default class InMemoryAuthGateway implements AuthGatewayInterface {
  private users: { [key: string]: User } = {}

  private usersLogged: { [key: string]: User } = {}

  async login(email: string, password: string): Promise<LoginResponse> {
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
    const { email, password, firstname, lastname } = userProps
    this.users[userId] = { id: userId, email, firstname, lastname }
    return Promise.resolve()
  }

  async refreshUser(authToken: string): Promise<LoginResponse> {
    const user = this.usersLogged[authToken]

    return Promise.resolve({ user, authToken })
  }

  getUser(userId: string) {
    return this.users[userId]
  }

  getUsersLogged() {
    return this.usersLogged
  }
}
