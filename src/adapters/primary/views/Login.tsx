import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findAuthErrorMessage } from "../../../redux/selectors/findAuthErrorMessage"
import { useHistory } from 'react-router-dom'
import { findAuthenticationStatus } from "../../../redux/selectors/findAuthenticationStatus"
import styled from '@emotion/styled'
import { FormLayout, InputText, PageContainer, PrimaryButton, TextLink } from "../components/sharedComponents"
import { Formik } from 'formik'
import { loginUser } from "../../../core/usecases/auth/login-user/loginUser"
import FormContainer from "../components/FormContainer"

interface LoginFormValues {
  email: string
  password: string
}

export default function Login() {
  const errorMessage = useSelector(findAuthErrorMessage)
  const history = useHistory()
  const dispatch = useDispatch()
  
  const status = useSelector(findAuthenticationStatus)

  useEffect(() => {
    if (status === 'connected') {
      history.replace('/')
    }
  }, [status, history])

  const submitLoginForm = ({email, password}: LoginFormValues) => {
    dispatch(loginUser(email, password))
  }

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <PageContainer data-testid="login-view">
      <FormContainer title="Connexion">
        <Formik initialValues={initialValues} onSubmit={submitLoginForm}>
          <FormLayout>
            <InputText placeholder="Email" type="email" name="email" />
            <InputText placeholder="Mot de passe" type="password" name="password" />
            <span>{errorMessage && errorMessage}</span>
            <ConnectionButton type="submit">
              Se connecter
            </ConnectionButton>
            <RegisterLink to="/register" >Je n'ai pas encore de compte</RegisterLink>
          </FormLayout>
        </Formik>
      </FormContainer>
    </PageContainer>
  )
}

const ConnectionButton = styled(PrimaryButton)({
  marginTop: '40px',
})

const RegisterLink = styled(TextLink)({
  marginTop: '20px',
})