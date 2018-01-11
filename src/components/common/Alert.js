import React from 'react'
import styled from 'styled-components'
import { colors, radiuses, spacing } from '../../styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: ${spacing.lg};
  border-radius: ${radiuses.RADIUS_DEFAULT};
  background-color: ${colors.LIGHT_RED};
  color: ${colors.DARK_RED};
  > *:not(:first-child) {
    margin-top: ${spacing.md};
  }
`

type Props = {
  children: any
}

export const Alert = (props: Props) => <Container>{props.children}</Container>

export default Alert
