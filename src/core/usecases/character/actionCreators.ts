import { ActionsUnion, createAction } from '../../../redux/customActions'
import Character from '../../models/Character'

export const CharacterActions = {
  charactersRetrieved: (characters: Character[]) =>
    createAction('CHARACTERS_RETRIEVED', { characters }),
  characterCreated: (character: Character) =>
    createAction('CHARACTER_CREATED', { character }),
  characterCreationFailed: (errorMessage: string) =>
    createAction('CHARACTER_ERROR', { errorMessage }),
}

export type CharacterActions = ActionsUnion<typeof CharacterActions>
