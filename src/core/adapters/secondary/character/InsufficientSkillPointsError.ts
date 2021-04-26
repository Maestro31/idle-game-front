export default class InsufficientSkillPointsError extends Error {
  constructor() {
    super('Insufficient skill points amount')
  }
}
