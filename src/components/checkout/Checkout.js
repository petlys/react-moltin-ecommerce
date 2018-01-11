import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { colors, spacing } from '../../styles'
import { CustomerForm, PaymentForm, PaymentCompleted, ProgressIndicator } from './'
import type { CheckoutStateStore } from '../../stores/CheckoutStateStore'
import type { ProductsDataStore } from '../../stores/ProductsDataStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`

const InnerContainer = styled.div`
  width: 100%;
  border-top: 2px solid ${colors.BACKGROUND};
  border-bottom: 2px solid ${colors.BACKGROUND};
  padding: ${spacing.lg} 0px;
  margin-top: ${spacing.lg};
`

const TermsText = styled.small`
  display: block;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  margin-top: ${spacing.md};
  > a {
    font-weight: bold;
  }
`

type Props = {
  checkoutStateStore: CheckoutStateStore,
  productsDataStore: ProductsDataStore
}

const Checkout = (props: Props) => {
  const { currentStep, customerFormValid, paymentFormValid } = props.checkoutStateStore

  return (
    <div>
      <Container className="animated zoomIn fast">
        <ProgressIndicator
          currentStep={currentStep}
          customerFormValid={customerFormValid}
          paymentFormValid={paymentFormValid}
        />
        <InnerContainer>
          {currentStep === 'customer' ? (
            <CustomerForm />
          ) : currentStep === 'payment' ? (
            <PaymentForm />
          ) : (
            <PaymentCompleted />
          )}
        </InnerContainer>
      </Container>
      <TermsText>
        Ved å fullføre ordre, så godkjenner du samtidig <Link to="/terms">kjøpsvilkår</Link>.
      </TermsText>
    </div>
  )
}

export default inject('checkoutStateStore', 'productsDataStore')(observer(Checkout))
