import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { Card } from '../components/card'
import { ListGrid } from '../components/list'
import { Button } from '../components/button'
import { IconButton } from '../components/button'
import { Link } from '../components/link'
import { useEnvironment } from '../contexts'

const Relative = styled.div`
  position: relative;
  flex: 1;
  & ${ Card.Body } {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &:nth-child(1) { z-index: -1; }
  &:nth-child(2) { z-index: -2; }
  &:nth-child(3) { z-index: -3; }
`

const DetailsSlider = styled(Card.Body)(({ theme, visible }) => `
  height: 100%;
  transform: translateY(${ visible ? '0' : '100%' });
  background-color: ${ visible ? theme.color.black : theme.color.grey.dark };
  transition: transform 250ms, background-color 750ms;
  color: ${ theme.color.white };
  & * {
    font-family: monospace;
  }
  & a {
    color: ${ theme.color.primary.light };
    transition: filter 250ms;
  }
  & a:hover {
    filter: brightness(0.75);
  }
`)

const AppCard = ({ name, description, details, docs }) => {
  const theme = useTheme()
  const [flipped, setFlipped] = useState(false)

  const toggleFlipped = event => setFlipped(!flipped)

  return (
    <Card style={{ minHeight: '300px' }}>
      <Card.Header>{ name }</Card.Header>
      <Relative>
        <Card.Body>
          { description }
        </Card.Body>
        <DetailsSlider visible={ flipped }>
          <h5>Details</h5>
          <Paragraph dense>{ details }</Paragraph>
          <Link to={ docs }>Docs</Link>
        </DetailsSlider>
      </Relative>
      <Card.Footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.color.grey.dark,
        transition: 'background-color 400ms'
      }}>
        <Button small variant="success">Launch</Button>
        <IconButton variant="info" icon="configure" fill={ flipped ? theme.color.white : theme.color.grey.light } size={ 24 } onClick={ toggleFlipped }/>
        <IconButton variant="info" icon="info" fill={ flipped ? theme.color.white : theme.color.grey.light } size={ 24 } onClick={ toggleFlipped }/>
      </Card.Footer>
    </Card>
  )
}

export const Apps = () => {
  const { context } = useEnvironment()

  if (!context) return (
    <Container>
      <Title>Apps</Title>
      <Paragraph>
        Sorry &mdash; no apps found!
      </Paragraph>
    </Container>
  )

  return (
    <Container>
      <Title>Apps</Title>

      <ListGrid items={ Object.keys(context.apps).sort().map(appKey => <AppCard key={ appKey } { ...context.apps[appKey] } />) } />

    </Container>
  )
}
