import React from 'react'
import styled from 'styled-components'
import { AccountIcon, CreditCardIcon, CheckmarkIcon } from '../icons'
import { Hr } from '../common'
import { colors } from '../../styles'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    flex-shrink: 0;
  }
`

const Line = styled(Hr)`
  background-color: ${props => (props.active ? colors.GREEN : colors.TERTIARY_TEXT)};
  width: 40px;
  height: 5px;
`

type Props = {
  currentStep: 'customer' | 'payment' | 'completed',
  customerFormValid: boolean,
  paymentFormValid: boolean
}

export const ProgressIndicator = (props: Props) => (
  <Container>
    <AccountIcon
      size="50"
      color={props.currentStep === 'customer' || props.customerFormValid ? colors.GREEN : colors.TERTIARY_TEXT}
    />
    <Line active={props.currentStep === 'customer' || props.customerFormValid} />
    <Line active={props.currentStep === 'payment' || props.paymentFormValid} />
    <CreditCardIcon
      size="50"
      color={props.currentStep === 'payment' || props.paymentFormValid ? colors.GREEN : colors.TERTIARY_TEXT}
    />
    <Line active={props.currentStep === 'payment' || props.paymentFormValid} />
    <Line active={props.currentStep === 'completed'} />
    <CheckmarkIcon size="50" color={props.currentStep === 'completed' ? colors.GREEN : colors.TERTIARY_TEXT} />
  </Container>
)

export default ProgressIndicator
