import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { TextField, SuccessButton, DangerButton } from '../common'
import { spacing } from '../../styles'
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
  div:first-child {
    margin-right: ${spacing.xs};
  }
  div:last-child {
    margin-right: ${spacing.xs};
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

type Props = {
  checkoutStateStore: CheckoutStateStore
}

const CustomerForm = (props: Props) => {
  const {
    updateCurrentStep,
    onEmailChange,
    onFirstnameChange,
    onLastnameChange,
    onAddressChange,
    onCountyChange,
    onPostcodeChange,
    emailValue,
    emailValid,
    firstnameValue,
    firstnameValid,
    lastnameValue,
    lastnameValid,
    addressValue,
    addressValid,
    countyValue,
    countyValid,
    postcodeValue,
    postcodeValid,
    customerFormValid
  } = props.checkoutStateStore

  return (
    <Container>
      <Header>Hvem skal vi sende til?</Header>
      <TextField
        required
        type="email"
        pattern="^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$"
        errorMsg="Ugyldig epost addresse"
        value={emailValue}
        valid={emailValid}
        onChange={onEmailChange}
        placeholder="Epost"
      />
      <InnerFormContainer>
        <TextField
          required
          errorMsg="Mangler fornavn"
          value={firstnameValue}
          valid={firstnameValid}
          onChange={onFirstnameChange}
          placeholder="Fornavn"
        />
        <TextField
          required
          errorMsg="Mangler etternavn"
          value={lastnameValue}
          valid={lastnameValid}
          onChange={onLastnameChange}
          placeholder="Etternavn"
        />
      </InnerFormContainer>
      <TextField
        required
        errorMsg="Mangler adresse"
        value={addressValue}
        valid={addressValid}
        onChange={onAddressChange}
        placeholder="Adresse"
      />
      <InnerFormContainer>
        <TextField
          required
          type="number"
          pattern="^[0-9]{4}$"
          errorMsg="Ugyldig postnummer"
          value={postcodeValue}
          valid={postcodeValid}
          onChange={onPostcodeChange}
          placeholder="Postnummer"
        />
        <TextField
          required
          errorMsg="Mangler fylke"
          value={countyValue}
          valid={countyValid}
          onChange={onCountyChange}
          placeholder="Fylke"
        />
      </InnerFormContainer>
      <InnerContainer>
        <Link to="/cart">
          <DangerButton>Tilbake</DangerButton>
        </Link>
        <SuccessButton onClick={() => updateCurrentStep('payment')} disabled={!customerFormValid}>
          Videre til betaling
        </SuccessButton>
      </InnerContainer>
    </Container>
  )
}

export default inject('checkoutStateStore')(observer(CustomerForm))
