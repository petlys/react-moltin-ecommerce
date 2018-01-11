import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { spacing, radiuses, breakpoints, colors } from '../../styles'
import { Price, Length } from './'
import missingImg from '../../images/missing.png'

const Container = styled(Link)`
  position: relative;
  margin: ${spacing.lg};
  background-color: ${colors.BACKGROUND};
  border: 2px solid ${colors.BACKGROUND};
  border-radius: ${radiuses.RADIUS_DEFAULT};
  color: ${colors.SECONDARY_TEXT};
  width: 230px;
  min-height: 250px;
  transition: 200ms;
  cursor: pointer;
  text-align: center;
  :hover {
    transform: scale(1.1);
  }
  @media (max-width: ${breakpoints.SMALL_AND_BELOW}) {
    margin: ${spacing.lg} ${spacing.md};
  }
`

const Image = styled.img`
  width: 100%;
  height: 230px;
  border-top-left-radius: ${radiuses.RADIUS_DEFAULT};
  border-top-right-radius: ${radiuses.RADIUS_DEFAULT};
`

const Title = styled.p`
  margin: ${spacing.sm};
  line-height: 1.5;
`

type Props = {
  product: Object
}

export const ProductCard = (props: Props) => {
  const { slug, imageUrl, name, stock } = props.product
  const price = props.product.meta.display_price.with_tax.amount / 100
  const length = props.product.sku.split('_')[1]

  return (
    <Container to={`/products/${slug}`}>
      <Image src={imageUrl || missingImg} alt="Produktbilde" className="animated zoomIn medium" />
      <Title>{name}</Title>
      <Price price={price} isOutOfStock={stock === 0} isAlmostOutOfStock={stock < 2} />
      {length && <Length length={length} />}
    </Container>
  )
}

export default ProductCard
