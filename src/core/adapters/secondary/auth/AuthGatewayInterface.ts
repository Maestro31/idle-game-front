import { User } from '../../../../redux/appState.interface'
import { UserProps } from '../../../models/User'
export default interface AuthGatewayInterface {
  register(userProps: UserProps): Promise<void>
  login(email: string, password: string): Promise<LoginResponse>
  refreshUser(authToken: string): Promise<LoginResponse>
}

export interface LoginResponse {
  user: User
  authToken: string
}
