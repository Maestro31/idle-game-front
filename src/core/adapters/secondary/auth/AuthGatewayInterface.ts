import { UserProps } from '../../../models/User'

export default interface AuthGatewayInterface {
  register(userProps: UserProps): Promise<void>
}
