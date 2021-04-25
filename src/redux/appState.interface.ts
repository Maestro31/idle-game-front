import { CharacterProps } from '../game/character/character.interface'

export interface AppState {
  auth: AuthState
  character: {
    byId: CharactersById
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
  [key: string]: Character
}

export interface Character {
  id: CharacterId
  properties: CharacterProps
}

type CharacterId = string
