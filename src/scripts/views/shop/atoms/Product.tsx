import * as React from 'react'

const Product = ({ title, price, quantity }: IProps) => {
  return (
    <div>
      {title} - &#36;
      {price}
      {quantity ? ` x ${quantity}` : null}
    </div>
  )
}

interface IProps {
  title: string
  price: number
  quantity: number
}

export default Product
