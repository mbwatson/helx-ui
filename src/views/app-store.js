import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { Section } from '../components/section'
import { Card } from '../components/card'
import { ListGrid } from '../components/list'
import { Button } from '../components/button'
import { IconButton } from '../components/button'

import registry from '../temp/registry.json'

const AppCard = ({ name, description }) => {
  const theme = useTheme()
  const [flipped, setFlipped] = useState(false)

  const toggleFlipped = event => setFlipped(!flipped)

  return (
    <Card style={{ minHeight: '250px' }}>
      <Card.Header>{ name }</Card.Header>
      {
        flipped
        ? (
          <Card.Body>
            <h5>Additional Details</h5>
            - detail 1 <br/>
            - detail 2 <br/>
            - detail 3 <br/>
          </Card.Body>
        ) : (
          <Card.Body>
            { description }
          </Card.Body>
        )
      }
      <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button small variant="success">Launch</Button>
        <IconButton variant="info" icon="info" fill={ flipped ? theme.color.primary.dark : theme.color.white } size={ 24 } onClick={ toggleFlipped }/>
      </Card.Footer>
    </Card>
  )
}

export const AppStore = () => {
  return (
    <Container>
      <Title>App Store</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>

      {
        Object.keys(registry.contexts).map(contextKey => registry.contexts[contextKey].apps && (
          <Section>
            <Heading>{ registry.contexts[contextKey].name }</Heading>
            <ListGrid
              items={
                Object.keys(registry.contexts[contextKey].apps).map(appKey => {
                  const appDetails = registry.contexts[contextKey].apps[appKey]
                  return <AppCard key={ `${ contextKey }-${ appKey }` } { ...appDetails } />
                })
              }
            />
          </Section>
        ))
      }

      <Paragraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
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
