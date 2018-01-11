import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import { colors, radiuses, spacing, breakpoints } from '../../styles'
import { DeleteIcon } from '../icons'
import { IconButton } from '../common'
import missingImg from '../../images/missing.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${colors.BACKGROUND};
  > *:not(:first-child) {
    margin-left: ${spacing.md};
  }
  > div {
    display: flex;
    align-items: center;
  }
  :first-child {
    border-top: 2px solid ${colors.BACKGROUND};
  }
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    font-size: smaller;
  }
`

const Name = styled.span`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    width: 50px;
    height: 50px;
  }
`

const QuantityInput = styled.input`
  margin-left: ${spacing.sm};
  border-radius: ${radiuses.RADIUS_SMALL};
  border: 2px solid ${colors.BACKGROUND};
  max-width 40px;
`

type Props = {
  product: Object,
  updateCartItemQuantity: Function,
  removeCartItem: Function,
  imageUrl: string
}

type State = {
  quantity: number
}

export class CartRow extends React.Component<Props, State> {
  state = {
    quantity: this.props.product.quantity
  }

  _onQuantityBlur = event => {
    this.props.updateCartItemQuantity(this.props.product.id, event.target.value)
    this.setState({ quantity: event.target.value })
  }

  _onQuantityChange = event => {
    this.setState({ quantity: event.target.value || 1 })
  }

  _removeCartItem = () => {
    this.props.removeCartItem(this.props.product.id)
  }

  render() {
    const { name, meta, sku } = this.props.product
    const totalPrice = meta.display_price.with_tax.value.formatted
    let length = sku.split('_')[1]
    length = length ? length : ''

    return (
      <Container className="animated zoomIn fast">
        <Image src={this.props.imageUrl || missingImg} alt="Produktbilde" />
        <Name>{`${name} ${length ? length : ''}`}</Name>
        <div>
          <MediaQuery minWidth={breakpoints.SMALL_AND_ABOVE}>
            <span>Antall:</span>
          </MediaQuery>
          <QuantityInput
            type="number"
            value={this.state.quantity}
            onChange={this._onQuantityChange}
            onBlur={this._onQuantityBlur}
            min={1}
          />
        </div>
        <MediaQuery minWidth={breakpoints.SMALL_AND_ABOVE}>
          <span>{totalPrice}</span>
        </MediaQuery>
        <IconButton onClick={this._removeCartItem}>
          <MediaQuery minWidth={breakpoints.SMALL_AND_ABOVE}>
            <DeleteIcon color={colors.SECONDARY_TEXT} />
          </MediaQuery>
          <MediaQuery maxWidth={breakpoints.SMALL_AND_BELOW}>
            <DeleteIcon color={colors.SECONDARY_TEXT} size="25" />
          </MediaQuery>
        </IconButton>
      </Container>
    )
  }
}

export default CartRow
