import React, { Fragment, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { Card } from '../components/card'
import { List, ListGrid } from '../components/list'
import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { Link } from '../components/link'
import { Input } from '../components/input';
import { Dropdown } from '../components/dropdown';
import { useEnvironment } from '../contexts'

const Relative = styled.div`
  position: relative;
  flex: 1;
  & ${Card.Body} {
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

const ConfigSlider = styled(Card.Body)(({ theme, visible }) => `
  height: 100%;
  transform: translateY(${visible ? '0' : '100%'});
  background-color: ${visible ? theme.color.black : theme.color.grey.dark};
  transition: transform 250ms, background-color 750ms;
  color: ${theme.color.white};
  & * {
    font-family: monospace;
  }
  & a {
    color: ${theme.color.primary.light};
    transition: filter 250ms;
  }
  & a:hover {
    filter: brightness(0.75);
  }
  & .actions {
    position: absolute;
    right: ${theme.spacing.medium};
    bottom: ${theme.spacing.medium};
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.medium};
  }
`)

const SpecsInput = styled(Input)`
  width: 15%;
  height: 30px;
`

const AppCard = ({ name, description, details, docs }) => {
  const theme = useTheme()
  const [flipped, setFlipped] = useState(false)

  const [currentMemory, setMemory] = useState();
  const [currentCpu, setCpu] = useState();
  const [currentGpu, setGpu] = useState();

  const toggleConfig = event => setFlipped(!flipped)
  const launchApp = event => {
    alert(`Launching ${name} with ${currentCpu} CPU core, ${currentGpu} GPU Core and ${currentMemory} GB Memory.`)
  }
  const gpuSpecs = [];
  const cpuSpecs = []
  const memorySpecs = [];
  for(let i=0;i<=4;i+=0.25){
    if(i%1 == 0) gpuSpecs.push(i);
    cpuSpecs.push(i);
    memorySpecs.push(i);
  }

  const handleMemoryChange = event =>{
    setMemory(event.target.value);
  }

  const handleCpuChange = event =>{
    setCpu(event.target.value);
  }

  const handleGpuChange = event =>{
    setGpu(event.target.value);
  }


  return (
    <Card style={{ minHeight: '300px', margin: `${theme.spacing.large} 0` }}>
      <Card.Header>{name}</Card.Header>
      <Relative>
        <Card.Body>
          <Paragraph>{description}</Paragraph>
          <Paragraph dense>{details}</Paragraph>
          <Link to={docs}>App Documentation</Link>
        </Card.Body>
        <ConfigSlider visible={flipped}>
          <h5>App Config</h5>
          <ul>
          <Dropdown value={currentMemory} id="memory" placeholder="Memory" onChange={handleMemoryChange}>
            {memorySpecs.map(memory => <option value={memory}>{memory} GB Memory</option>)}
            </Dropdown>
            <Dropdown value={currentCpu} placeholder="CPU" onChange={handleCpuChange}>
              {cpuSpecs.map(cpu => <option value={cpu}>{cpu} CPU Core</option>)}
            </Dropdown>
            <Dropdown value={currentGpu} placeholder="GPU" onChange={handleGpuChange}>
              {gpuSpecs.map(gpu => <option value={gpu}>{gpu} GPU Core</option>)}
            </Dropdown>
          </ul>
          <div className="actions">
            <Button small variant="success" onClick={() => { launchApp(); toggleConfig(); }} style={{ width: '150px' }}>
              <Icon icon="check" fill="#eee" /> Confirm
            </Button>
          </div>
        </ConfigSlider>
      </Relative>
      <Card.Footer style={{
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'background-color 400ms'
      }}>
        <Button small variant={flipped ? 'danger' : 'info'} onClick={toggleConfig} style={{ width: '150px' }}>
          <Icon icon={flipped ? 'close' : 'launch'} fill="#eee" />{flipped ? 'Cancel' : 'Launch App'}
        </Button>
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

      { Object.keys(context.apps).sort().map(appKey => <AppCard key={appKey} {...context.apps[appKey]} />)}

    </Container>
  )
}
