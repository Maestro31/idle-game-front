import { ActionsUnion, createAction } from '../../../redux/customActions'
import { CreateCharacterPayload } from '../../adapters/secondary/character/CharacterGatewayInterface'
import Character from '../../models/Character'

export const CharacterActions = {
  charactersRetrieved: (characters: Character[]) =>
    createAction('CHARACTERS_RETRIEVED', { characters }),
  characterRetrieved: (character: Character) =>
    createAction('CHARACTER_RETRIEVED', { character }),
  characterCreated: (character: CreateCharacterPayload) =>
    createAction('CHARACTER_CREATED', { character }),
  characterCreationFailed: (errorMessage: string) =>
    createAction('CHARACTER_ERROR', { errorMessage }),
  characterUpdated: (character: Character) =>
    createAction('CHARACTER_UPDATED', { character }),
  characterUpdateFailed: (errorMessage: string) =>
    createAction('CHARACTER_ERROR', { errorMessage }),
  characterDeleted: (id: string) => createAction('CHARACTER_DELETED', { id }),
}

export type CharacterActionTypes = ActionsUnion<typeof CharacterActions>
