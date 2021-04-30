import { AppState } from '../appState.interface'

export const findCharacterById = (id: string) => (state: AppState) =>
  state.character.byId[id]
