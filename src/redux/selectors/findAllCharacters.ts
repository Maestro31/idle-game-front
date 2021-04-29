import { AppState } from '../appState.interface'

export const findAllCharacters = (state: AppState) =>
  Object.values(state.character.byId)
