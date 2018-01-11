import React from 'react'
import styled from 'styled-components'
import Raven from 'raven-js'
import { inject, observer } from 'mobx-react'
import { colors } from '../../styles'
import { CheckmarkIcon } from '../icons'
import type { CheckoutStateStore } from '../../stores/CheckoutStateStore'
import type { ProductsDataStore } from '../../stores/ProductsDataStore'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    margin-bottom: 0;
  }
`

type Props = {
  checkoutStateStore: CheckoutStateStore,
  productsDataStore: ProductsDataStore
}

export class PaymentCompleted extends React.Component<Props, {}> {
  componentDidMount() {
    const cartProducts = this.props.productsDataStore.cartProducts.reduce((accumulator, product) => {
      let length = product.sku.split('_')[1]
      length = length ? length : ''

      return accumulator + `${product.quantity}x ${product.name} ${length}</br>`
    }, '')

    const {
      firstnameValue,
      lastnameValue,
      addressValue,
      postcodeValue,
      countyValue,
      emailValue
    } = this.props.checkoutStateStore

    const formData = new FormData()
    formData.append('products', cartProducts)
    formData.append('firstname', firstnameValue)
    formData.append('lastname', lastnameValue)
    formData.append('address', addressValue)
    formData.append('postcode', postcodeValue)
    formData.append('county', countyValue)
    formData.append('email', emailValue)

    fetch('/sendMail.php', {
      cache: 'no-store',
      method: 'POST',
      body: formData
    }).catch(error => Raven.captureException(error))
  }

  componentWillUnmount() {
    this.props.checkoutStateStore.updateCurrentStep('customer')
    this.props.productsDataStore.emptyCart()
  }

  render() {
    return (
      <Container>
        <CheckmarkIcon size="150" color={colors.GREEN} className="animated bounceIn" />
        <h2>Takk for din bestilling!</h2>
        <p>Du vil straks motta en bestillingsbekreftelse på epost.</p>
      </Container>
    )
  }
}

export default inject('checkoutStateStore', 'productsDataStore')(observer(PaymentCompleted))
