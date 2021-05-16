import FightGatewayInterface, {
  FightResult,
} from '../../../core/adapters/secondary/fight/FightGatewayInterface'
import ApiGateway from '../ApiGateway'

export default class RealFightGateway
  extends ApiGateway
  implements FightGatewayInterface
{
  constructor() {
    super('battle')
  }

  async runFight(id: string): Promise<FightResult> {
    try {
      const { data } = await this.client().post('/', { characterID: id })
      return data
    } catch (e) {
      throw new Error(e.response.data.message)
    }
  }
}
