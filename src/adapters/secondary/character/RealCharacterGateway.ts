import CharacterGatewayInterface, {
  CreateCharacterPayload,
  Skill,
} from '../../../core/adapters/secondary/character/CharacterGatewayInterface'
import Character from '../../../core/models/Character'
import { BattleResult } from '../../../redux/appState.interface'
import ApiGateway from '../ApiGateway'

export default class RealCharacterGateway
  extends ApiGateway
  implements CharacterGatewayInterface
{
  constructor() {
    super('characters')
  }

  async retrieveCharacter(characterId: string): Promise<Character> {
    const { data } = await this.client().get(`/${characterId}`)
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

  async deleteCharacter(characterId: string): Promise<void> {
    await this.client().delete(`/${characterId}`)
  }

  async retrieveBattleResults(characterId: string): Promise<BattleResult[]> {
    const { data } = await this.client().get(`/${characterId}/history`)
    return data
  }
}
