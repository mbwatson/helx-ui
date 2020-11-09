import styled, { useTheme } from 'styled-components'
import { Icon } from '../icon'
import { Button } from './button'

const Wrapper = styled(Button)(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: ${ theme.spacing.small };
`)

export const IconButton = ({ icon, fill, variant, size }) => {
  return (
    <Wrapper  variant={ variant }>
      <Icon icon={ icon } fill={ fill } size={ size }/>
    </Wrapper>
  )
}

