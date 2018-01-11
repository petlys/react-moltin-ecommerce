import React from 'react'
import styled from 'styled-components'
import { colors, spacing, radiuses } from '../../styles'

type LengthProps = {
  length: string,
  style?: Object
}

const Container = styled.div`
  position: absolute;
  background-color: white;
  top: -13px;
  left: 30px;
  font-weight: 400;
  border-top-right-radius: ${radiuses.RADIUS_DEFAULT};
  border-bottom-right-radius: ${radiuses.RADIUS_DEFAULT};
  background-color: ${colors.BACKGROUND};
  padding-left: ${spacing.lg};
  padding-right: ${spacing.md};
  height: 40px;
  color: ${colors.SECONDARY_TEXT};
`

export const Length = (props: LengthProps) => (
  <Container style={props.style} className="centerFlex">
    <span>{props.length.toLowerCase()}</span>
  </Container>
)

export default Length
