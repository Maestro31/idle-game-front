import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { SecondaryButton } from './sharedComponents'
import { flexColumnCenterStyle } from './styles'

export default function HomeButton() {
  const history = useHistory()

  return (
    <Container>
      <SecondaryButton onClick={() => history.push('/')}>
        Retourner au choix des combattants
      </SecondaryButton>
    </Container>
  )
}

const Container = styled.div({
  ...(flexColumnCenterStyle as {}),
  justifyContent: 'flex-end',
  flexGrow: 1,
  width: '100%',
})
