import { Link as ReactLink } from '@reach/router'
import styled from 'styled-components'

export const Link = styled(ReactLink)``

export const ExternalLink = styled(ReactLink).attrs(props => ({
  href: props.to,
  rel: 'noopener noreferrer',
}))``