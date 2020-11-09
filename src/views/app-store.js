import React from 'react'
import { useTheme } from 'styled-components'
import { Container } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { Section } from '../components/section'
import { Card } from '../components/card'
import { ListGrid } from '../components/list'
import { Button } from '../components/button'
import { IconButton } from '../components/button'

import registry from '../temp/registry.json'

export const AppStore = () => {
  const theme = useTheme()
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
                  const { name, description } = registry.contexts[contextKey].apps[appKey]
                  return (
                    <Card key={ `${ contextKey }-${ appKey }` } style={{ minHeight: '250px' }}>
                      <Card.Header>{ name }</Card.Header>
                      <Card.Body>
                        { description }
                      </Card.Body>
                      <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button small variant="success">Launch</Button>
                        <IconButton variant="info" icon="info" fill={ theme.color.white } size={ 24 }/>
                      </Card.Footer>
                    </Card>
                  )
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
