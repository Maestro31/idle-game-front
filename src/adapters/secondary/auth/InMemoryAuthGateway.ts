import AuthGatewayInterface from '../../../core/adapters/secondary/auth/AuthGatewayInterface'
import { UserProps } from '../../../core/models/User'

export default class InMemoryAuthGateway implements AuthGatewayInterface {
  private userRegistered = false

  async register(userProps: UserProps): Promise<void> {
    this.userRegistered = true
    return Promise.resolve()
  }

  isUserRegistered() {
    return this.userRegistered
  }
}
