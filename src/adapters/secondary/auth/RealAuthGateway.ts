import AuthGatewayInterface, {
  LoginResponse,
} from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'
import InvalidCredentialsError from '../../../core/adapters/secondary/auth/InvalidCredentialsError'
import ApiGateway from '../ApiGateway'

export default class RealAuthGateway
  extends ApiGateway
  implements AuthGatewayInterface
{
  constructor() {
    super('users')
  }

  async register(userProps: UserProps): Promise<void> {
    await this.client().post('/', userProps)
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await this.client().post('/signin', { email, password })
      return data
    } catch (e) {
      if (e.response.status === 401) {
        throw new InvalidCredentialsError()
      } else {
        throw e
      }
    }
  }

  async refreshUser(authToken: string): Promise<LoginResponse> {
    const { data } = await this.client().get('/me')
    return data
  }
}
