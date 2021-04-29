import React from 'react'
import styled from '@emotion/styled'

export interface FormContainerProps {
  title: string
  children: React.ReactNode,
}

export default function FormContainer({title, children}: FormContainerProps) {
  return (
    <Container>
      <Title>{title}</Title>
        { children }
    </Container>
  )
}

const Container = styled.div({
  backgroundColor: "#A08585",
  borderRadius: '10px',
  width: '100%',
  padding: "20px",
  boxSizing: 'border-box',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
})

const Title = styled.h3({
  fontSize: '1.2em',
  marginTop: '10px',
  fontWeight: 'normal',
})