import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { colors } from '../../styles'
import { CheckmarkIcon } from '../icons'

import type { RouterHistory } from 'react-router-dom'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  flex-direction: column;
  color: ${colors.BLACK};
`

type Props = {
  history: RouterHistory
}
type State = {
  redirectToCart: boolean
}

export class AddedToCartMessage extends React.Component<Props, State> {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/cart')
    }, 1500)
  }

  render() {
    return (
      <Container className="centerFlex">
        <CheckmarkIcon size="150" color={colors.GREEN} className="animated bounceIn" />
        <h1 className="animated bounceIn">Lagt i handlevogn!</h1>
      </Container>
    )
  }
}

export default withRouter(AddedToCartMessage)
