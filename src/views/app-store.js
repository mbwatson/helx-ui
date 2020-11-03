import React from 'react'
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { Card } from '../components/card'
import { ListGrid } from '../components/list'

const tempApps = [
  { id: 'one', name: 'App One' },
  { id: 'two', name: 'App Two' },
  { id: 'three', name: 'App Three' },
  { id: 'four', name: 'App Four' },
  { id: 'five', name: 'App Five' },
  { id: 'six', name: 'App Six' },
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

      <ListGrid
        items={ tempApps.map(app => (
            <Card key={ app.id }>
              <Card.Header>{ app.name }</Card.Header>
              <Card.Body>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                dtempor incididunt ut labore et dolore magna aliqua
              </Card.Body>
              <Card.Footer>
                Launch | View Info
              </Card.Footer>
            </Card>
          ))
        }
      />
      

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
