import AuthGatewayInterface from './core/adapters/secondary/auth/AuthGatewayInterface'
import CharacterGatewayInterface from './core/adapters/secondary/character/CharacterGatewayInterface'
import FightGatewayInterface from './core/adapters/secondary/fight/FightGatewayInterface'
import LocalStorageInterface from './core/adapters/secondary/storage/LocalStorageInterface'

export interface Dependencies {
  authGateway: AuthGatewayInterface
  localStorageService: LocalStorageInterface
  characterGateway: CharacterGatewayInterface
  fightGateway: FightGatewayInterface
}
