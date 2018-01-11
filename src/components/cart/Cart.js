import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import CartRow from './CartRow'
import EmptyCart from './EmptyCart'
import { SuccessButton, DangerButton, Alert } from '../common'
import { spacing } from '../../styles'
import type { ProductsDataStore } from '../../stores/ProductsDataStore'

const Container = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: ${spacing.md};
  button:first-child {
    margin-right: ${spacing.md};
  }
`

const Sum = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacing.md} 0;
`

type Props = {
  productsDataStore: ProductsDataStore
}

type State = {}

class Cart extends React.Component<Props, State> {
  _renderCartRows() {
    const { updateCartItemQuantity, removeCartItem, cartProducts, products } = this.props.productsDataStore

    return cartProducts.map(cartProduct => {
      const product = products.find(product => product.id === cartProduct.product_id) || {}
      const imageUrl = product.imageUrl

      return (
        <CartRow
          product={cartProduct}
          imageUrl={imageUrl}
          updateCartItemQuantity={updateCartItemQuantity}
          removeCartItem={removeCartItem}
          key={cartProduct.product_id}
        />
      )
    })
  }

  render() {
    const { cartProducts, emptyCart, cartTotal, error } = this.props.productsDataStore
    const cartIsEmpty = cartProducts.length === 0
    const freeShipping = cartTotal >= 15000

    if (cartIsEmpty) return <EmptyCart />

    return (
      <Container>
        <Helmet>
          <title>Adaptere.no - Handlevogn</title>
          <meta name="description" content="Handlevogn" />
          <link rel="canonical" href="https://adaptere.no/cart" />
          <meta property="og:title" content="Adaptere.no - Handlevogn" />
          <meta property="og:description" content="Handlevogn" />
          <meta property="og:image" content="https://adaptere.no/thumbnail.png" />
          <meta property="og:url" content="https://adaptere.no/cart" />
        </Helmet>

        {error === 'updateCartItemQuantityError' && (
          <Alert type="danger">Huff da.. Kunne ikke oppdatere antall. Prøv igjen!</Alert>
        )}

        {error === 'removeCartItemError' && (
          <Alert type="danger">Huff da.. Kunne ikke fjerne produkt fra handlevogn. Prøv igjen!</Alert>
        )}

        {error === 'emptyCartError' && <Alert type="danger">Huff da.. Kunne ikke tømme handlevogn. Prøv igjen!</Alert>}

        {this._renderCartRows()}

        <ButtonsContainer>
          <DangerButton onClick={emptyCart}>Tøm handlevogn</DangerButton>
          <Link to="/checkout">
            <SuccessButton>Til kasse</SuccessButton>
          </Link>
          <Sum>
            {!freeShipping && (
              <span>
                Frakt: <b>29 Kr</b>
              </span>
            )}
            <span>
              Totalt: <b>{cartTotal / 100} Kr</b>
            </span>
          </Sum>
        </ButtonsContainer>
      </Container>
    )
  }
}

export default inject('productsDataStore')(observer(Cart))
