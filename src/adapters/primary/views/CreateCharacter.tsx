import { useDispatch } from 'react-redux'
import { createCharacter } from '../../../core/usecases/character/create-character/createCharacter'
import useCharacterCreator from '../hooks/useCharacterCreator'
import { useHistory } from 'react-router-dom'
import CharacterDetails from '../components/character/CharacterDetails'
import styled from '@emotion/styled'
import {
  flexColumnStyle,
  inputTextStyle,
  secondaryByttonStyle,
} from '../components/styles'
import { PageContainer } from '../components/sharedComponents'
import SkillForm from '../components/character/SkillForm'

export default function CreateCharacter() {
  const {
    characterProps,
    increment,
    decrement,
    cannotBeDecremented,
    validCharacter,
    updateCharacterName,
  } = useCharacterCreator()
  const dispatch = useDispatch()
  const history = useHistory()

  const submitCharacter = () => {
    dispatch(createCharacter(characterProps))
    history.push('/')
  }

  return (
    <PageContainer data-testid="create-character-view">
      <CharacterDetails characterProps={characterProps} />
      <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        <InputText
          type="text"
          placeholder="Nom du personnage"
          onChange={updateCharacterName}
          value={characterProps.name}
        />
        <SkillForm
          characterProps={characterProps}
          increment={increment}
          decrement={decrement}
          cannotBeDecremented={cannotBeDecremented}
        />
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

const ButtonContainer = styled.div({
  ...(flexColumnStyle as {}),
  flexGrow: 1,
  justifyContent: 'flex-end',
})

const CreateCharacterButton = styled.button({
  ...(secondaryByttonStyle as {}),
})
