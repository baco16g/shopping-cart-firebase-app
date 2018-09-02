import * as React from 'react'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import * as shopModel from '@redux/shop/reducers'
import * as shopActions from '@redux/shop/actions'
import ProductItem from '@views/shop/molecules/ProductItem'

const Products = ({ products, addToCart }: IProps) => {
  return (
    <div>
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <ProductItem
            key={product.code}
            product={product}
            onAddToCartClicked={() => addToCart(product.code)}
          />
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state: shopModel.IRootState) => ({
  products: shopModel.getVisibleProducts(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(shopActions, dispatch)
  }
})

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    addToCart: ({ actions }: IConnectedProps) => (productCode: ProductCode) => {
      actions.addToCart({ productCode })
    }
  })
)

interface IConnectedProps
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandlers {
  addToCart: (productCode: ProductCode) => void
}

interface IProps extends IConnectedProps, IHandlers {}

export default enhancer(Products)
