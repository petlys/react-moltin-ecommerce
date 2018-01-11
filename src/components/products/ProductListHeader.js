import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import { spacing, colors, breakpoints } from '../../styles'
import FreeShipping from './FreeShipping'

const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  margin: auto;
  @media (min-width: ${breakpoints.SMALL_AND_ABOVE}) {
    margin: ${spacing.xl} auto;
  }
`

const Green = styled.span`
  border-radius: 100px;
  width: 20px;
  height: 20px;
  background-color: ${colors.GREEN};
  border: 5px solid ${colors.BACKGROUND};
`

const Yellow = styled(Green)`
  background-color: ${colors.YELLOW};
`

const Red = styled(Yellow)`
  background-color: ${colors.RED};
`

const StockText = styled.small`
  font-size: 12px;
`

export const ProductListHeader = () => (
  <div>
    <MediaQuery minWidth={breakpoints.SMALL_AND_ABOVE}>
      <FreeShipping />
    </MediaQuery>
    <ColorsContainer>
      <Green />
      <StockText>På lager</StockText>
      <Yellow />
      <StockText>Få igjen</StockText>
      <Red />
      <StockText>Tomt på lager</StockText>
    </ColorsContainer>
  </div>
)

export default ProductListHeader
