import AuthGatewayInterface from './core/adapters/secondary/auth/AuthGatewayInterface'
import LocalStorageInterface from './core/adapters/secondary/storage/LocalStorageInterface'

export interface Dependencies {
  authGateway: AuthGatewayInterface
  localStorageService: LocalStorageInterface
}
