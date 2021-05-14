import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../../core/usecases/auth/create-user/createUser'
import {
  FormLayout,
  InputText,
  PageContainer,
  PrimaryButton,
  TextLink,
} from '../components/sharedComponents'
import FormContainer from '../components/FormContainer'
import styled from '@emotion/styled'
import * as Yup from 'yup'
import { useHistory } from 'react-router'
import { findAuthenticationStatus } from '../../../redux/selectors/findAuthenticationStatus'

interface RegisterFormValues {
  firstname: string
  lastname: string
  email: string
  password: string
  passwordConfirmation: string
}

export default function Register() {
  const dispatch = useDispatch()
  const history = useHistory()

  const status = useSelector(findAuthenticationStatus)

  useEffect(() => {
    if (status === 'connected') {
      history.replace('/')
    }
  }, [status, history])

  const submitRegisterForm = ({
    firstname,
    lastname,
    email,
    password,
  }: RegisterFormValues) => {
    dispatch(createUser({ firstname, lastname, email, password }))
  }

  const initialValues: RegisterFormValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Prénom requis'),
    lastname: Yup.string().required('Nom requis'),
    email: Yup.string().email('Format email invalide').required('Email requis'),
    password: Yup.string().required('Mot de passe requis'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Mauvaise confirmation du mot de passe'
    ),
  })

  return (
    <PageContainer data-testid="register-view">
      <FormContainer title="Créer mon compte">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitRegisterForm}
        >
          {({ errors, touched }) => (
            <FormLayout>
              <InputText
                placeholder="Prénom"
                type="firstname"
                name="firstname"
                error={touched.firstname && errors.firstname}
              />
              <InputText
                placeholder="Nom"
                type="lastname"
                name="lastname"
                error={touched.lastname && errors.lastname}
              />
              <InputText
                placeholder="Email"
                type="email"
                name="email"
                error={touched.email && errors.email}
              />
              <InputText
                style={{ marginTop: '40px' }}
                placeholder="Mot de passe"
                type="password"
                name="password"
                error={touched.password && errors.password}
              />
              <InputText
                placeholder="Confirmation du mot de passe"
                type="password"
                name="passwordConfirmation"
                error={
                  touched.passwordConfirmation && errors.passwordConfirmation
                }
              />
              <RegisterButton type="submit">Créer mon compte</RegisterButton>
              <LoginLink to="/login">J'ai déjà un compte</LoginLink>
            </FormLayout>
          )}
        </Formik>
      </FormContainer>
    </PageContainer>
  )
}

const RegisterButton = styled(PrimaryButton)({
  marginTop: '10px',
})

const LoginLink = styled(TextLink)({
  marginTop: '20px',
})
