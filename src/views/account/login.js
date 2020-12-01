import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container } from '../../components/layout'
import { Title, Paragraph } from '../../components/typography'
import { Input } from '../../components/input';
import { InputGroup } from '../../components/input-group';
import { Button } from '../../components/button'
import { useAuth } from '../../contexts'

const LoginInput = styled(Input)` 
    margin: 10px 10px;
    width: 20%
`

const LoginInputGroup = styled(InputGroup)` 
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Login = () => {
  const auth = useAuth();
  const [username, setUserName] = useState();
  const [pwd, setPwd] = useState();

  return (
    <Container>
      <Title>You are not logged in</Title>

      <LoginInputGroup>
        <LoginInput placeholder="Username" onChange={(event) => {setUserName(event.target.value)}}>
        </LoginInput>
        <LoginInput placeholder="Password" onChange={(event) => {setPwd(event.target.value)}}>
        </LoginInput>
      <Button onClick={() => {auth.login([username,pwd])} }>LOGIN</Button>
      
      </LoginInputGroup>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
    </Container>
  )
}
