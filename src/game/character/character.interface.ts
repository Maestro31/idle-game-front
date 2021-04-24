export interface Character {
  name: string
  skillPoints: number
  health: number
  attack: number
  defense: number
  magic: number
}

export type Skill = 'health' | 'attack' | 'defense' | 'magic'
