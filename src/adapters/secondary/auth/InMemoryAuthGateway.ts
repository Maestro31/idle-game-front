import AuthGatewayInterface, {
  LoginResponse,
} from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'
import { User } from '../../../redux/appState.interface'
import InvalidCredentialsError from '../../../core/adapters/secondary/auth/InvalidCredentialsError'

export default class InMemoryAuthGateway implements AuthGatewayInterface {
  private users: { [key: string]: User } = {
    'jack.skellington@halloween.com-h@lloween': {
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
    },
  }

  private usersLogged: { [key: string]: User } = {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = this.users[`${email}-${password}`]

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

  async register(userProps: UserProps): Promise<void> {
    const { email, password, firstname, lastname } = userProps
    this.users[`${email}-${password}`] = { email, firstname, lastname }
    return Promise.resolve()
  }

  async refreshUser(authToken: string): Promise<LoginResponse> {
    const user = this.usersLogged[authToken]

    return Promise.resolve({ user, authToken })
  }

  getUser(email: string, password: string) {
    return this.users[`${email}-${password}`]
  }

  getUsersLogged() {
    return this.usersLogged
  }
}
