import React from 'react'
import { Container } from '../../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { useAuth } from '../../contexts'
import { Login } from './login'
import { Profile } from './profile'

export const Account = () => {
  const auth = useAuth()

  if (auth.user) {
    return <Profile />
  }
  return <Login />
}