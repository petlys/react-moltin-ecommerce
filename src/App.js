import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import {
  Header,
  Footer,
  About,
  ProductList,
  ProductDetails,
  PageNotFound,
  Loading,
  Cart,
  Checkout,
  Terms,
  UnderConstruction
} from './components'
import { spacing, breakpoints } from './styles'
import type { ProductsDataStore } from './stores/ProductsDataStore'

const Container = styled.div`
  position: relative;
  padding: ${spacing.lg} 108px;
  margin-bottom: 70px;
  @media (max-width: ${breakpoints.MEDIUM_AND_BELOW}) {
    padding: ${spacing.xl};
  }
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    padding: ${spacing.lg};
  }
`

type Props = {
  productsDataStore: ProductsDataStore
}

type State = {
  showUnderConstruction: boolean
}

class App extends React.Component<Props, State> {
  state = {
    showUnderConstruction: false
  }

  _hideUnderConstruction = () => {
    this.setState({ showUnderConstruction: false })
  }

  componentDidMount() {
    this.props.productsDataStore.fetchProducts()
  }

  render() {
    const { products, loading, error } = this.props.productsDataStore

    return (
      <div>
        <Helmet>
          <title>Adaptere.no - Stort utvalg av kabler, adaptere, overganger mm.</title>
          <meta name="description" content="Stort utvalg av kabler, adaptere, overganger mm." />
          <link rel="canonical" href="https://adaptere.no" />
          <meta property="og:title" content="Adaptere.no" />
          <meta property="og:description" content="Stort utvalg av kabler, adaptere, overganger mm." />
          <meta property="og:image" content="https://adaptere.no/thumbnail.png" />
          <meta property="og:url" content="https://adaptere.no" />
        </Helmet>

        <Header />

        {this.state.showUnderConstruction && <UnderConstruction hide={this._hideUnderConstruction} />}

        <Container>
          {loading ? (
            <Loading />
          ) : (
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/usb" />} />
              <Route
                path="/usb"
                render={() => (
                  <ProductList products={products} category="e908db92-7539-47ff-810b-673922eb57c3" error={error} />
                )}
              />
              <Route
                path="/lyd"
                render={() => (
                  <ProductList products={products} category="dd0c53d5-6a41-4d98-a645-f558d8370fe6" error={error} />
                )}
              />
              <Route
                path="/bilde"
                render={() => (
                  <ProductList products={products} category="49fe0d57-c8e7-4398-9be7-cc44481fa0df" error={error} />
                )}
              />
              <Route
                path="/diverse"
                render={() => (
                  <ProductList products={products} category="72f86359-2b6d-420b-b958-0d1a9223e296" error={error} />
                )}
              />
              <Route path="/products/:slug" component={ProductDetails} />
              <Route path="/about" component={About} />
              <Route path="/terms" component={Terms} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route component={PageNotFound} />
            </Switch>
          )}
        </Container>

        <Footer />
      </div>
    )
  }
}

export default withRouter(inject('productsDataStore')(observer(App)))
