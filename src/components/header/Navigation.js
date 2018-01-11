import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { spacing, radiuses } from '../../styles'

const StyledNavLink = styled(NavLink)`
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  margin-right: ${spacing.lg};
  border-radius: ${radiuses.RADIUS_SMALL};
`

const activeStyles = {
  color: 'black',
  backgroundColor: 'white',
  padding: `${spacing.xs} ${spacing.md}`
}

export const Navigation = () => (
  <div>
    <StyledNavLink exact to="/usb" activeStyle={activeStyles}>
      USB
    </StyledNavLink>
    <StyledNavLink exact to="/lyd" activeStyle={activeStyles}>
      Lyd
    </StyledNavLink>
    <StyledNavLink exact to="/bilde" activeStyle={activeStyles}>
      Bilde
    </StyledNavLink>
    <StyledNavLink exact to="/diverse" activeStyle={activeStyles}>
      Diverse
    </StyledNavLink>
  </div>
)

export default Navigation
