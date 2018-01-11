import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { CartIcon } from '../icons'
import { spacing, breakpoints } from '../../styles'
import type { ProductsDataStore } from '../../stores/ProductsDataStore'

const Container = styled.div`
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: ${spacing.sm};
    margin-top: ${spacing.sm};
  }
`

const StyledLink = styled(Link)`
  margin-left: ${spacing.md};
  display: flex;
  align-items: center;
  font-weight: 400;
  color: white;
  transition: 400ms;
`

type Props = {
  productsDataStore: ProductsDataStore
}

const Cart = (props: Props) => (
  <Container>
    <StyledLink to="/cart">
      <CartIcon color="white" />
      <span>{props.productsDataStore.cartProducts.length}</span>
    </StyledLink>
  </Container>
)

export default inject('productsDataStore')(observer(Cart))
