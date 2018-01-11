import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { spacing } from '../../styles'
import { ProductCard, ProductListHeader } from './'
import type { Errors } from '../../stores/ProductsDataStore'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: ${spacing.md};
`

type Props = {
  products: Array<Object>,
  category: string,
  error: Errors
}

export class ProductList extends React.Component<Props> {
  _renderProducts = () => {
    const categoryFilteredProducts = this.props.products.filter(product =>
      product.relationships.categories.data.some(category => category.id === this.props.category)
    )

    return categoryFilteredProducts.map(product => <ProductCard product={product} key={product.id} />)
  }

  render() {
    const category = window.location.pathname.replace('/', '')

    return (
      <div>
        <Helmet>
          <title>Adaptere.no - {category.toUpperCase()}</title>
          <meta name="description" content={`${category.toUpperCase()} kabler, overganger og adaptere`} />
          <link rel="canonical" href={`https://adaptere.no/${category}`} />
          <meta property="og:title" content={`Adaptere.no - ${category.toUpperCase()}`} />
          <meta property="og:description" content={`${category.toUpperCase()} kabler, overganger og adaptere`} />
          <meta property="og:image" content="https://adaptere.no/thumbnail.png" />
          <meta property="og:url" content={`https://adaptere.no/${category}`} />
        </Helmet>

        <ProductListHeader />

        <Container>{this._renderProducts()}</Container>
      </div>
    )
  }
}

export default ProductList
