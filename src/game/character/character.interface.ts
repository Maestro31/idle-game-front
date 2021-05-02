export interface CharacterProps {
  name: string
  skillPoints: number
  health: number
  attack: number
  defense: number
  magic: number
  rank: number
  recoveredAt: string
}

export type Skill = 'health' | 'attack' | 'defense' | 'magic'
