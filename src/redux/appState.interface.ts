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
  errorMessage: string | null
  status: 'idle' | 'fetching' | 'connected' | 'disconnected'
}

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
}

export interface CharactersById {
  [key: string]: CharacterDTO
}
