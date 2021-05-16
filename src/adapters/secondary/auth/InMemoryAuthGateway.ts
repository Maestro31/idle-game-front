import AuthGatewayInterface, {
  LoginResponse,
} from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'
import { User } from '../../../redux/appState.interface'
import InvalidCredentialsError from '../../../core/adapters/secondary/auth/InvalidCredentialsError'

export default class InMemoryAuthGateway implements AuthGatewayInterface {
  private users: User[] = []

  private usersLogged: User[] = []

  async login(email: string, _: string): Promise<LoginResponse> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const authToken = `${user.firstname.toLowerCase()}-${user.lastname.toLowerCase()}`
    this.usersLogged.push(user)

    return Promise.resolve({
      user,
      authToken,
    })
  }

  async register(userProps: UserProps): Promise<void> {
    const { email, firstname, lastname } = userProps
    this.users.push({ email, firstname, lastname })
  }

  async refreshUser(authToken: string): Promise<LoginResponse> {
    const [firstname, lastname] = authToken.split('-')

    const user = Object.values(this.users).find(
      (user) =>
        user.firstname.toLowerCase() === firstname &&
        user.lastname.toLowerCase() === lastname
    )

    if (!user) {
      throw new Error('User not found')
    }

    return { user, authToken }
  }

  getUser(email: string) {
    return this.users.find((user) => user.email === email)
  }

  getUsersLogged() {
    return this.usersLogged
  }
}
