import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { TextField, SuccessButton, DangerButton } from '../common'
import { spacing, radiuses, colors } from '../../styles'
import visa from '../../images/visaBlack.svg'
import mastercard from '../../images/mastercardBlack.svg'
import type { CheckoutStateStore } from '../../stores/CheckoutStateStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > input {
    align-items: center;
  }
`

const InnerFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  div:nth-child(2) {
    margin: 0 ${spacing.xs};
  }
`

const PaymentLogo = styled.img`
  transition: 200ms;
  opacity: ${props => (props.cardMatches ? 0.7 : 0.2)};
  :first-child {
    margin-right: ${spacing.sm};
  }
  :last-child {
    margin-left: ${spacing.sm};
  }
`

const Header = styled.h2`
  margin-top: 0;
`

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Alert = styled.div`
  width: 100%;
  padding: ${spacing.sm};
  margin: ${spacing.md} 0;
  text-align: center;
  border-radius: ${radiuses.RADIUS_DEFAULT};
  background-color: ${colors.LIGHT_RED};
  color: ${colors.DARK_RED};
`

type Props = {
  checkoutStateStore: CheckoutStateStore
}

const PaymentForm = (props: Props) => {
  const {
    onCardNumberChange,
    onCardMonthChange,
    onCardYearChange,
    onCVVChange,
    cardNumberValue,
    cardNumberValid,
    cardMonthValue,
    cardMonthValid,
    cardYearValue,
    cardYearValid,
    cvvValue,
    cvvValid,
    paymentFormValid,
    isVisaCard,
    isMasterCard,
    doPayment,
    updateCurrentStep,
    paymentError
  } = props.checkoutStateStore

  return (
    <Container>
      <InnerContainer>
        <Header>Betaling</Header>
        <div>
          <PaymentLogo cardMatches={isVisaCard} src={visa} alt="Visa" />
          <PaymentLogo cardMatches={isMasterCard} src={mastercard} alt="Mastercard" />
        </div>
      </InnerContainer>

      {paymentError && <Alert>Huff da, her gikk visst noe galt. Vennligst sjekk at det er dekning på konto.</Alert>}

      <TextField
        required
        errorMsg="Ugyldig kortnummer"
        id="cardNumber"
        pattern={/^4\d{12}(?:\d{3})?|5[1-5]\d{14}$/} // Matches Visa and Mastercard
        value={cardNumberValue}
        valid={cardNumberValid}
        onChange={onCardNumberChange}
        placeholder="Kortnummer"
      />
      <InnerFormContainer>
        <TextField
          required
          type="number"
          pattern="^[0-9]{2}$"
          errorMsg="Mangler utløpsmåned"
          id="cardExpirationMonth"
          value={cardMonthValue}
          valid={cardMonthValid}
          onChange={onCardMonthChange}
          placeholder="Måned"
        />
        <TextField
          required
          type="number"
          pattern="^[0-9]{2}$"
          errorMsg="Mangler utløpsår"
          id="cardExpirationYear"
          value={cardYearValue}
          valid={cardYearValid}
          onChange={onCardYearChange}
          placeholder="År"
        />
        <TextField
          required
          type="number"
          pattern="^[0-9]{3}$"
          errorMsg="Ugyldig CVV"
          id="cardCsc"
          value={cvvValue}
          valid={cvvValid}
          onChange={onCVVChange}
          placeholder="CVV"
        />
      </InnerFormContainer>

      <InnerContainer>
        <DangerButton onClick={() => updateCurrentStep('customer')}>Tilbake</DangerButton>
        <SuccessButton onClick={doPayment} disabled={!paymentFormValid}>
          Fullfør ordre
        </SuccessButton>
      </InnerContainer>
    </Container>
  )
}

export default inject('checkoutStateStore')(observer(PaymentForm))
