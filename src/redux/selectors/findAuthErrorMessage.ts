import { AppState } from '../appState.interface'

export const findAuthErrorMessage = (state: AppState) => state.auth.errorMessage
