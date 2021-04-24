export interface AppState {
  auth: AuthState
}

export interface AuthState {
  user: User | null
}

export interface User {
  firstname: string
  lastname: string
  email: string
}
