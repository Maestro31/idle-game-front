import { AppState } from '../appState.interface'

export const findUser = (state: AppState) => state.auth.user
