import { Character } from '../character/character.interface'

export class Fighter {
  protected remainingHealth: number

  constructor(protected character: Character) {
    this.remainingHealth = character.health
  }

  getCharacter(): Character {
    return this.character
  }

  getAttack(): number {
    return this.character.attack
  }

  getDefense(): number {
    return this.character.defense
  }

  getRemainingHealth() {
    return this.remainingHealth
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
      damageToInflict += this.character.magic
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
    return this.character.magic === damageToInflict
  }
}