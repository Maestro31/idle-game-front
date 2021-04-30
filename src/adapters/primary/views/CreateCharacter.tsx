import { useDispatch } from 'react-redux'
import Character from '../../../core/models/Character'
import { createCharacter } from '../../../core/usecases/character/create-character/createCharacter'
import useCharacterCreator from '../hooks/useCharacterCreator'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import CharacterDetails from '../components/character/CharacterDetails'
import styled from '@emotion/styled'
import {
  flexColumnStyle,
  inputTextStyle,
  secondaryByttonStyle,
} from '../components/styles'
import InputCharacterSkill from '../components/character/InputCharacterSkill'
import { PageContainer } from '../components/sharedComponents'

export default function CreateCharacter() {
  const {
    character,
    increment,
    decrement,
    validCharacter,
    updateCharacterName,
  } = useCharacterCreator()
  const dispatch = useDispatch()
  const history = useHistory()

  const submitCharacter = () => {
    dispatch(
      createCharacter(Character.fromPrimitives({ id: uuid(), ...character }))
    )
    history.push('/')
  }

  return (
    <PageContainer data-testid="create-character-view">
      <CharacterDetails character={character} />
      <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        <InputText
          type="text"
          placeholder="Nom du personnage"
          onChange={updateCharacterName}
          value={character.name}
        />
        <SkillPointsCount>
          {character.skillPoints} points restants
        </SkillPointsCount>
        <SkillsContainer>
          <InputCharacterSkill
            label="Santé"
            increment={increment('health')}
            decrement={decrement('health')}
          />
          <InputCharacterSkill
            label="Attaque"
            increment={increment('attack')}
            decrement={decrement('attack')}
          />
          <InputCharacterSkill
            label="Magie"
            increment={increment('magic')}
            decrement={decrement('magic')}
          />
          <InputCharacterSkill
            label="Défense"
            increment={increment('defense')}
            decrement={decrement('defense')}
          />
        </SkillsContainer>
        <ButtonContainer>
          <CreateCharacterButton
            disabled={!validCharacter}
            onClick={submitCharacter}
          >
            Créer le personnage
          </CreateCharacterButton>
        </ButtonContainer>
      </div>
    </PageContainer>
  )
}

const InputText = styled.input({
  ...(inputTextStyle as {}),
  marginTop: '20px',
})

const SkillPointsCount = styled.h3({
  color: '#FAE056',
  fontSize: '1.5em',
  textAlign: 'center',
})

const SkillsContainer = styled.div({
  ...(flexColumnStyle as {}),
  alignItems: 'center',
})

const ButtonContainer = styled.div({
  ...(flexColumnStyle as {}),
  flexGrow: 1,
  justifyContent: 'flex-end',
})

const CreateCharacterButton = styled.button({
  ...(secondaryByttonStyle as {}),
})
