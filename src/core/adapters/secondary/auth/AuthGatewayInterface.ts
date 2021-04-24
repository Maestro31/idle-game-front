import { UserProps } from '../../../models/User'
export default interface AuthGatewayInterface {
  register(userProps: UserProps): Promise<void>
  login(email: string, password: string): Promise<LoginResponse>
  refreshUser(authToken: string): Promise<LoginResponse>
}

export interface LoginResponse {
  user: {
    firstname: string
    lastname: string
    email: string
  }
  authToken: string
}
