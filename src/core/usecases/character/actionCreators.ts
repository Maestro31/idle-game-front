import { Character } from '../../../redux/appState.interface'
import { ActionsUnion, createAction } from '../../../redux/customActions'

export const CharacterActions = {
  charactersRetrieved: (characters: Character[]) =>
    createAction('CHARACTERS_RETRIEVED', { characters }),
}

export type CharacterActions = ActionsUnion<typeof CharacterActions>
