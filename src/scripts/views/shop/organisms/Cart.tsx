import * as React from 'react'
import { ComponentEnhancer, compose, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import * as shopModel from '@redux/shop/reducers'
import * as shopActions from '@redux/shop/actions'
import Product from '@views/shop/atoms/Product'

const Cart = ({ products, total, onCheckoutClicked }: IProps) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map((product, i) => (
      <li key={`cart-product-${i}`}>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
        />
      </li>
    ))
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <ul>{nodes}</ul>
      <p>
        Total: &#36;
        {total}
      </p>
      <button onClick={onCheckoutClicked} disabled={!hasProducts}>
        Checkout
      </button>
    </div>
  )
}

const mapStateToProps = (state: shopModel.IRootState) => ({
  products: shopModel.getCartProducts(state),
  total: shopModel.getTotal(state)
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
    onCheckoutClicked: ({ actions }: IConnectedProps) => () => {
      actions.checkout({})
    }
  }),
  lifecycle<IConnectedProps, {}>({
    componentWillReceiveProps(nextProps) {
      if (nextProps.products.length < 1) {
        this.props.actions.restoreCart({})
      }
    }
  })
)

interface IConnectedProps
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandlers {
  onCheckoutClicked: () => void
}

interface IProps extends IConnectedProps, IHandlers {}

export default enhancer(Cart)
