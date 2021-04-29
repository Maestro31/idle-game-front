import React from "react"
import { useDispatch } from "react-redux"
import Character from "../../../core/models/Character"
import { createCharacter } from "../../../core/usecases/character/create-character/createCharacter"
import useCharacterCreator from "../hooks/useCharacterCreator"
import { v4 as uuid } from 'uuid'
import { useHistory } from "react-router-dom"

export default function CreateCharacter() {
  const {character, increment, decrement, validCharacter, updateCharacterName} = useCharacterCreator()
  const dispatch = useDispatch()
  const history = useHistory()

  const submitCharacter = () => {
    dispatch(createCharacter(Character.fromPrimitives({id: uuid(), ...character})))
    history.push('/')
  }

  return (<div data-testid="create-character-view">
    <input type="text" value={character.name} onChange={updateCharacterName}/>
    <p>Points de compétences restants {character.skillPoints} </p>
    <p><button onClick={decrement('health')}>-</button> Santé {character.health} <button onClick={increment('health')}>+</button></p>
    <p><button onClick={decrement('attack')}>-</button> Attaque {character.attack} <button onClick={increment('attack')}>+</button></p>
    <p><button onClick={decrement('magic')}>-</button> Magie {character.magic} <button onClick={increment('magic')}>+</button></p>
    <p><button onClick={decrement('defense')}>-</button> Défense {character.defense} <button onClick={increment('defense')}>+</button></p>
    <button disabled={!validCharacter} onClick={submitCharacter}>Créer</button>
  </div>)
}