import { AppState } from '../appState.interface'

export const findAuthenticationStatus = (state: AppState) => state.auth.status
