import React from 'react'
import styled from 'styled-components'
import { Spinner } from './Spinner'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`

type Props = {}

export const Loading = (props: Props) => (
  <Container className="centerFlex">
    <Spinner />
  </Container>
)

export default Loading
