import React from 'react'
import { Container } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { Section } from '../components/section'
import { Card } from '../components/card'
import { ListGrid } from '../components/list'
import { Button } from '../components/button'

const tempApps = [
  { id: 'one', name: 'App One', type: 'A' },
  { id: 'two', name: 'App Two', type: 'B' },
  { id: 'three', name: 'App Three', type: 'B' },
  { id: 'four', name: 'App Four', type: 'C' },
  { id: 'five', name: 'App Five', type: 'B' },
  { id: 'six', name: 'App Six', type: 'A' },
  { id: 'seven', name: 'App Seven', type: 'A' },
  { id: 'eight', name: 'App Eight', type: 'B' },
  { id: 'nine', name: 'App Nine', type: 'C' },
  { id: 'ten', name: 'App Ten', type: 'A' },
]

export const AppStore = () => {
  return (
    <Container>
      <Title>App Store</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>

      <Section>
        <Heading>App Group A</Heading>
        <ListGrid
          items={ tempApps.filter(item => item.type === 'A').map(app => (
              <Card key={ app.id }>
                <Card.Header>{ app.name }</Card.Header>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  dtempor incididunt ut labore et dolore magna aliqua
                </Card.Body>
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button small variant="success">Launch</Button>
                  <Button small variant="info">Info</Button>
                </Card.Footer>
              </Card>
            ))
          }
        />
      </Section>
      
      <Section>
        <Heading>App Group B</Heading>
        <ListGrid
          items={ tempApps.filter(item => item.type === 'B').map(app => (
              <Card key={ app.id }>
                <Card.Header>{ app.name }</Card.Header>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  dtempor incididunt ut labore et dolore magna aliqua
                </Card.Body>
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button small variant="success">Launch</Button>
                  <Button small variant="info">Info</Button>
                </Card.Footer>
              </Card>
            ))
          }
        />
      </Section>
      
      <Section>
        <Heading>App Group C</Heading>
        <ListGrid
          items={ tempApps.filter(item => item.type === 'C').map(app => (
              <Card key={ app.id }>
                <Card.Header>{ app.name }</Card.Header>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  dtempor incididunt ut labore et dolore magna aliqua
                </Card.Body>
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button small variant="success">Launch</Button>
                  <Button small variant="info">Info</Button>
                </Card.Footer>
              </Card>
            ))
          }
        />
      </Section>
      

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
