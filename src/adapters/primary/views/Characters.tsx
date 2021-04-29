import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveCharacters } from "../../../core/usecases/character/retrieve-characters/retrieveCharacters"
import { findAllCharacters } from "../../../redux/selectors/findAllCharacters"
import { Link } from 'react-router-dom'
import { PageContainer } from "../components/sharedComponents"

export default function Characters() {
  const characters = useSelector(findAllCharacters)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveCharacters)
  }, [dispatch])

  return (
    <PageContainer data-testid="characters-view">
      <ul>
        {
          characters.map(character => (<li key={character.id}>{character.name}</li>))
        }
      </ul>
      { characters.length < 10 && <Link to="/create-character">Créer un nouveau personnage</Link>}
    </PageContainer>
  )
}