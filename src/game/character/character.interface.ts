export interface CharacterProps {
  name: string
  skillPoints: number
  health: number
  attack: number
  defense: number
  magic: number
  rank: number
}

export type Skill = 'health' | 'attack' | 'defense' | 'magic'
