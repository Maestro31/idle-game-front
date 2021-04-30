import { useState } from 'react'
import { Skill } from '../../../game/character/character.interface'
import CharacterCreator from '../../../game/character/CharacterCreator'

export default function useCharacterCreator() {
  const characterCreator = new CharacterCreator()
  const [characterProps, setCharacterProps] = useState(
    characterCreator.createCharacterProps('')
  )
  const [validCharacter, setValidCharacter] = useState(false)

  const increment = (skill: Skill) => (e: React.MouseEvent) => {
    setCharacterProps(characterCreator.increment(skill, characterProps))
  }

  const decrement = (skill: Skill) => (e: React.MouseEvent) => {
    setCharacterProps(characterCreator.decrement(skill, characterProps))
  }

  const updateCharacterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setValidCharacter(name.length >= 3)
    setCharacterProps({ ...characterProps, name })
  }

  return {
    updateCharacterName,
    increment,
    decrement,
    validCharacter,
    characterProps,
  }
}
