import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Field, Form } from 'formik'
import {
  flexColumnStyle,
  inputTextStyle,
  primaryButtonStyle,
  secondaryByttonStyle,
} from './styles'

export const TextLink = styled(Link)({
  color: '#362C26',
})

export const PrimaryButton = styled.button({ ...(primaryButtonStyle as {}) })

export const SecondaryButton = styled.button({
  ...(secondaryByttonStyle as {}),
})

export const InputText = styled(Field)(({ error }: { error?: boolean }) => ({
  ...(inputTextStyle as {}),
  border: error ? '1px solid #a20d0d' : 'none',
}))

export const FormLayout = styled(Form)({
  ...(flexColumnStyle as {}),
  alignItems: 'center',
})

export const PageContainer = styled.div({
  ...(flexColumnStyle as {}),
  alignItems: 'center',
  height: 'calc(100% - 58px)',
  boxSizing: 'border-box',
  color: 'white',
})
