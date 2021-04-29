import { UserProps } from '../../../models/User'
export default interface AuthGatewayInterface {
  register(id: string, userProps: UserProps): Promise<void>
  login(email: string, password: string): Promise<LoginResponse>
  refreshUser(authToken: string): Promise<LoginResponse>
  logoutUser(authToken: string): Promise<void>
}

export interface LoginResponse {
  user: {
    id: string
    firstname: string
    lastname: string
    email: string
  }
  authToken: string
}
