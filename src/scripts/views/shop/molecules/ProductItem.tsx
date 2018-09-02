import * as React from 'react'
import Product from '@views/shop/atoms/Product'

const ProductItem = ({ product, onAddToCartClicked }: IProps) => {
  const hasInventory = product.inventory > 0
  return (
    <li style={{ marginBottom: 20 }}>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.inventory}
      />
      <button onClick={onAddToCartClicked} disabled={!hasInventory}>
        {hasInventory ? 'Add to cart' : 'Sold Out'}
      </button>
    </li>
  )
}

interface IProps {
  product: Product
  onAddToCartClicked: () => void
}

export default ProductItem
