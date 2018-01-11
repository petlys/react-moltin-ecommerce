import styled from 'styled-components'
import { spacing, radiuses, colors } from '../../styles'

export const Button = styled.button`
  position: relative;
  padding: ${spacing.md};
  border: 2px solid ${colors.BLACK};
  background-color: white;
  border-radius: ${radiuses.RADIUS_SMALL};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: 200ms;
  font-size: smaller;
  text-transform: uppercase;
  opacity: ${props => props.disabled && 0.4};
  :focus {
    outline: 0;
  }
  :hover {
    transform: ${props => (!props.disabled ? 'scale(1.1)' : 'initial')};
  }
`

export const IconButton = styled(Button)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  :hover {
    transform: scale(1.1);
  }
`

export const SuccessButton = styled(Button)`
  border: none;
  color: white;
  background-color: ${colors.GREEN};
`

export const WarningButton = styled(Button)`
  border: none;
  color: white;
  background-color: ${colors.YELLOW};
`

export const DangerButton = styled(Button)`
  border: none;
  color: white;
  background-color: ${colors.RED};
`
