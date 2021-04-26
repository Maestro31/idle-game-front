import { CharacterDTO } from '../core/models/Character'

export interface AppState {
  auth: AuthState
  character: {
    byId: CharactersById
    errorMessage: string | null
  }
}

export interface AuthState {
  user: User | null
}

export interface User {
  firstname: string
  lastname: string
  email: string
}

export interface CharactersById {
  [key: string]: CharacterDTO
}
