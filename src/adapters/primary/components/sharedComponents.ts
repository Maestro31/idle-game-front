import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Field, Form } from 'formik'

export const TextLink = styled(Link)({
  color: '#362C26',
})

const Button = styled.button({
  width: '100%',
  height: '48px',
  borderRadius: '3px',
  border: 'none',
  '&[disabled]': {
    opacity: '0.7',
  },
})

export const PrimaryButton = styled(Button)({
  backgroundColor: '#362C26',
  color: '#EBE0D6',
})

export const InputText = styled(Field)(({ error }: { error?: boolean }) => ({
  width: '100%',
  height: '48px',
  padding: '12px',
  color: '#362C26',
  boxSizing: 'border-box',
  borderRadius: '3px',
  backgroundColor: '#DCD0CA',
  fontSize: '1em',
  border: error ? '1px solid #a20d0d' : 'none',
  outline: 'none',
  '::placeholder': {
    color: '#A08585',
  },
  '& + input': {
    marginTop: '10px',
  },
}))

export const FormLayout = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  boxSizing: 'border-box',
})
