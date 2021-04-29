import { useState } from 'react'
import { Skill } from '../../../game/character/character.interface'
import CharacterCreator from '../../../game/character/CharacterCreator'

export default function useCharacterCreator() {
  const characterCreator = new CharacterCreator()
  const [character, setCharacter] = useState(
    characterCreator.createCharacterProps('')
  )
  const [validCharacter, setValidCharacter] = useState(false)

  const increment = (skill: Skill) => (e: React.MouseEvent) => {
    setCharacter(characterCreator.increment(skill, character))
  }

  const decrement = (skill: Skill) => (e: React.MouseEvent) => {
    setCharacter(characterCreator.decrement(skill, character))
  }

  const updateCharacterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setValidCharacter(name.length >= 3)
    setCharacter({ ...character, name })
  }

  return {
    updateCharacterName,
    increment,
    decrement,
    validCharacter,
    character,
  }
}
