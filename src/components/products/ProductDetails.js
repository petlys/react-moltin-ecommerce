import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from '../common'
import { CartIcon } from '../icons'
import { spacing, radiuses, breakpoints, colors } from '../../styles'
import Price from './Price'
import Length from './Length'
import AddedToCartMessage from './AddedToCartMessage'
import { Alert } from '../common'
import missingImg from '../../images/missing.png'
import type { ProductsDataStore } from '../../stores/ProductsDataStore'

import type { Match, RouterHistory } from 'react-router-dom'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${spacing.xl};
  @media (min-width: ${breakpoints.SMALL_AND_ABOVE}) {
    padding: ${spacing.xl} 0px;
    border-top: 2px solid ${colors.BACKGROUND};
    border-bottom: 2px solid ${colors.BACKGROUND};
  }
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    flex-direction: column;
    align-items: center;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > p {
    flex: 2;
    max-width: 400px;
  }

  > h1 {
    @media (min-width: ${breakpoints.SMALL_AND_BELOW}) {
      margin-top: 0;
    }
  }

  > small {
    color: ${colors.SECONDARY_TEXT};
  }

  @media (min-width: ${breakpoints.SMALL_AND_ABOVE}) {
    margin-right: ${spacing.xl};
  }
`

const Image = styled.img`
  border-radius: ${radiuses.RADIUS_DEFAULT};
  width: 350px;
  height: 350px;
  border: 2px solid ${colors.BACKGROUND};
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    width: 300px;
    height: 300px;
  }
`

const ImageAndPriceContainer = styled.div`
  position: relative;
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    order: -1;
  }
`

const AddToCartButton = styled(Button)`
  margin-top: ${spacing.xl};
  max-width: 400px;
`

type Props = {
  history: RouterHistory,
  match: Match,
  productsDataStore: ProductsDataStore
}

type State = {
  product: Object
}

class ProductDetails extends React.Component<Props, State> {
  state = {
    product: this.props.productsDataStore.products.find(product => product.slug === this.props.match.params.slug) || {}
  }

  _addToCart = () => {
    this.props.productsDataStore.addProductToCart(this.state.product.id)
  }

  render() {
    if (Object.keys(this.state.product).length === 0) {
      this.props.history.push('/404')
      return null
    }

    const product = this.state.product
    const length = product.sku.split('_')[1]
    const stock = product.stock
    const { addToCartSuccess, error } = this.props.productsDataStore

    return (
      <div>
        <Helmet>
          <title>{product.name}</title>
          <meta name="description" content={product.description} />
          <link rel="canonical" href={`https://adaptere.no/products/${product.slug}`} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={`https://adaptere.no/products/${product.slug}`} />
          <meta property="og:image" content={product.imageUrl || missingImg} />
          <meta property="og:url" content={`https://adaptere.no/products/${product.slug}`} />
        </Helmet>

        {error === 'addProductToCartError' && (
          <Alert type="danger">
            <span>Huff da.. Kunne legge produkt i handlevogn. Prøv igjen!</span>
          </Alert>
        )}

        <Container>
          <TextContainer className="animated fadeIn medium">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <small>{stock} igjen på lager</small>

            <AddToCartButton onClick={this._addToCart} disabled={product.stock === 0}>
              <CartIcon size="30" style={{ marginRight: spacing.sm }} color={colors.BLACK} />
              Legg i handlevogn
            </AddToCartButton>
          </TextContainer>
          <ImageAndPriceContainer className="animated fadeInRight medium">
            <Image src={product.imageUrl || missingImg} alt="Produktbilde" />
            <Price
              price={product.meta.display_price.with_tax.amount / 100}
              isOutOfStock={product.stock === 0}
              isAlmostOutOfStock={product.stock < 2}
            />
            {length && <Length length={length} />}
          </ImageAndPriceContainer>

          {addToCartSuccess && <AddedToCartMessage />}
        </Container>
      </div>
    )
  }
}

export default withRouter(inject('productsDataStore')(observer(ProductDetails)))
