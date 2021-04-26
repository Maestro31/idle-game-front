export interface CharacterDTO {
  id: string
  name: string
  skillPoints: number
  attack: number
  magic: number
  defense: number
  health: number
}

export interface CharacterProps {
  name: string
  skillPoints: number
  attack: number
  magic: number
  defense: number
  health: number
}

export default class Character {
  constructor(readonly id: string, readonly props: CharacterProps) {}

  getSkillPoints(): number {
    return this.props.skillPoints
  }

  getProps() {
    return this.props
  }

  static fromPrimitives(dto: CharacterDTO): Character {
    const { id, ...props } = dto
    return new Character(id, props)
  }

  toPrimitives(): CharacterDTO {
    return {
      id: this.id,
      name: this.props.name,
      skillPoints: this.props.skillPoints,
      attack: this.props.attack,
      magic: this.props.magic,
      defense: this.props.defense,
      health: this.props.health,
    }
  }
}
