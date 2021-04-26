import { CharacterProps } from '../character/character.interface'

export class Fighter {
  protected remainingHealth: number

  constructor(protected characterProps: CharacterProps) {
    this.remainingHealth = characterProps.health
  }

  getCharacter(): CharacterProps {
    return this.characterProps
  }

  getAttack(): number {
    return this.characterProps.attack
  }

  getDefense(): number {
    return this.characterProps.defense
  }

  getRemainingHealth(): number {
    return this.remainingHealth
  }

  getRank(): number {
    return this.characterProps.rank
  }

  attemptToInflictDamage(attackToInflict: number, opponent: Fighter): void {
    if (this.cannotInflictDamage(attackToInflict, opponent)) {
      return
    }

    let damageToInflict = this.calculateDamageToInflict(
      attackToInflict,
      opponent
    )

    if (this.canInflictMagicDamage(damageToInflict)) {
      damageToInflict += this.characterProps.magic
    }

    opponent.takeDamage(damageToInflict)
  }

  takeDamage(damage: number): void {
    this.remainingHealth = this.remainingHealth - damage
  }

  private cannotInflictDamage(
    attackToInflict: number,
    opponent: Fighter
  ): boolean {
    return this.calculateDamageToInflict(attackToInflict, opponent) <= 0
  }

  private calculateDamageToInflict(
    attackToInflict: number,
    opponent: Fighter
  ): number {
    return attackToInflict - opponent.getDefense()
  }

  private canInflictMagicDamage(damageToInflict: number): boolean {
    return this.characterProps.magic === damageToInflict
  }
}
