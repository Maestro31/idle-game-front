import CharacterGatewayInterface, {
  CreateCharacterPayload,
} from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import Character from '../../../core/models/Character'
import { Skill } from '../../../services/character.interface'
import ApiGateway from '../ApiGateway'

export default class RealCharacterGateway
  extends ApiGateway
  implements CharacterGatewayInterface
{
  constructor() {
    super('characters')
  }

  async retrieveCharacter(id: string): Promise<Character> {
    const { data } = await this.client().get(`/${id}`)
    return Character.fromPrimitives(data)
  }

  async retrieveCharacters(): Promise<Character[]> {
    const { data } = await this.client().get('/')
    return data.map((raw: any) => Character.fromPrimitives(raw))
  }

  async createCharacter(payload: CreateCharacterPayload): Promise<void> {
    await this.client().post('/', payload)
  }

  async incrementSkill(skill: Skill, characterId: string): Promise<void> {
    await this.client().post(`/${characterId}/increment/${skill}`)
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.client().delete(`/${id}`)
  }
}
